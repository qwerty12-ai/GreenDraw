import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { verifyToken } from "@/lib/auth";
import User from "@/models/User";

export async function POST(req) {
    try {
        await connectDB();

        const decoded = verifyToken(req);

        if(!decoded) {
            return NextResponse.json({error: "Unauthorized"}, {status: 401})
        }

        const { charityId, percentage } = await req.json();

        if(!mongoose.Types.ObjectId.isValid(charityId) || percentage < 10 || percentage > 100) {
            return NextResponse.json({error: "Invalid input"}, {status: 400})
        }

        const user = await User.findById(decoded.id)

        if(!user) {
            return NextResponse.json({error: "User not found"}, {status: 404})
        }

        user.charity = {
            charityId,
            percentage
        }

        await user.save();

        return NextResponse.json({ message: "Charity preference saved", charity: user.charity })
        
    } catch(error) {
        return NextResponse.json({error: "Failed to update charity"}, {status: 500})
    }
}