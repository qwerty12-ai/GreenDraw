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

        const {plan} = await req.json();

        if (!plan || !["monthly","yearly"].includes(plan)) {
            return NextResponse.json({
                error: "Invalid plan"
            }, {status: 400})
        }

        const user = await User.findById(decoded.id);

        if (!user) {
            return NextResponse.json({error: "User not found"}, {status: 404})
        }

        const now = new Date();
        let renewalDate = new Date();

        if(plan === "monthly") {
            renewalDate.setMonth(now.getMonth() + 1);
        } else {
            renewalDate.setFullYear(now.getFullYear() + 1);
        }

        user.subscription = {
            plan: plan,
            status: "active",
            renewalDate
        }
        
        await user.save();

        return NextResponse.json({message: "Subscription updated", subscription: user.subscription})
    } catch(error) {
        return NextResponse.json({error: "Failed to update subscription"}, {status: 500})
    }

}