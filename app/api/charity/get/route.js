import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Charity from "@/models/Charity";

export async function GET() {
    try {
        await connectDB();

        const charities = await Charity.find();

        return NextResponse.json({ charities })
        
    } catch(error) {
        return NextResponse.json({error: "Failed to fetch charities"}, {status: 500})
    }
}