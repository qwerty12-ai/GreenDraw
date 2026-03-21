import {NextResponse} from "next/server"
import {connectDB} from "@/lib/db"
import {verifyToken} from "@/lib/auth"
import Draw from "@/models/Draw"
 
export async function GET(req) {
    try {
        await connectDB();

        const decoded = verifyToken(req);

        if(!decoded) {
            return NextResponse.json({error: "Unauthorized"}, {status: 401})
        }

        const draw = await Draw.findOne().sort({createdAt: -1})

        if(!draw) {
            return NextResponse.json({error: "No draw found"}, {status: 404});
        }

        return NextResponse.json(draw)

    } catch(error) {
        return NextResponse.json({error: "Failed to fetch draw"}, {status: 500})
    }
}