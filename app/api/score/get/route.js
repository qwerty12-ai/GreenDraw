import {NextResponse} from "next/server"
import {connectDB} from "@/lib/db"
import {verifyToken} from "@/lib/auth"
import User from "@/models/User"
 
export async function GET(req) {
    try {
        await connectDB();

        const decoded = verifyToken(req);

        if(!decoded) {
            return NextResponse.json(
                {error: "Unauthorized"},
                {status: 401}
            )
        }

        const user = await User.findById(decoded.id);
        
        if (!user) {
            return NextResponse.json({error: "User not found"}, {status: 404})
        }

        const sortedScores = (user.scores || []).sort((a,b) => new Date(b.date) - new Date(a.date));

        return NextResponse.json({
            scores: sortedScores
        })

    } catch(error) {
        return NextResponse.json({error: "Failed to fetch scores"}, {status: 500})
    }
}