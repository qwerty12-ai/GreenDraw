import {NextResponse} from "next/server"
import {connectDB} from "@/lib/db"
import {verifyToken} from "@/lib/auth"
import User from "@/models/User"
 
export async function POST(req) {
    try {
        await connectDB();

        const decoded = verifyToken(req);

        if(!decoded) {
            return NextResponse.json(
                {error: "Unauthorized"},
                {status: 401}
            )
        }

        const {value} = await req.json();

        if (typeof value !== "number" || value < 1 || value > 45) {
            return NextResponse.json({
                error: "Score must be between 1 and 45"
            }, {status: 400})
        }

        const user = await User.findById(decoded.id);

        if (!user) {
            return NextResponse.json({error: "User not found"}, {status: 404})
        }

        user.scores.unshift({value, date: new Date()})

        if(user.scores.length > 5) {
            user.scores.pop();
        }

        await user.save();

        return NextResponse.json({message: "Score added", scores: user.scores})
    } catch(error) {
        return NextResponse.json({error: "Failed to add score"}, {status: 500})
    }
}