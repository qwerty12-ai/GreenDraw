import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Draw from "@/models/Draw"

export async function GET() {
    try {
        await connectDB();
        const latest = await Draw.findOne().sort({createdAt: -1})

        return NextResponse.json({
            numbers: latest?.numbers || []
        })
    } catch (error) {
        return NextResponse.json({error: "Failed"}, {status: 500})
    }
}