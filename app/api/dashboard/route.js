import { NextResponse } from "next/server";

import { connectDB } from "@/lib/db";
import { verifyToken } from "@/lib/auth";

import User from "@/models/User";
import Draw from "@/models/Draw";

export async function GET(req) {
    try {
        await connectDB();

        const decoded = verifyToken(req);
        const isAuthenticated = !!decoded;

        let user = null;
        let userData = null;

        if (isAuthenticated) {
            user = await User.findById(decoded.id).populate("charity.charityId");
            if (!user) {
                return NextResponse.json({error: "User not found"}, {status: 404})
            }
        }

        const latestDraw = await Draw.findOne().sort({createdAt: -1})

        const participation = {
            totalDrawsEntered: user ? (user.winnings?.length || 0) : 0,
            latestDrawDate: latestDraw ? latestDraw.createdAt : null
        }

        const totalWon = user ? user.winnings.reduce((sum, w) => sum + (w.amount || 0), 0) : 0

        if (isAuthenticated) {
            userData = {
                user: {
                    name: user.name,
                    email: user.email
                },
                subscription: user.subscription,
                scores: user.scores,
                charity: user.charity,
                participation,
                winnings: {
                    totalWon,
                    history: user.winnings
                },
                latestDraw,
                isAuthenticated: true
            }
        } else {
            // Demo/guest view
            userData = {
                user: null,
                subscription: { status: "inactive", plan: null },
                scores: [],
                charity: null,
                participation,
                winnings: {
                    totalWon: 0,
                    history: []
                },
                latestDraw,
                isAuthenticated: false,
                demoMessage: "Sign up to track your scores and participate in draws!"
            }
        }

        return NextResponse.json(userData)

    } catch(error) {
        return NextResponse.json({error: "Failed to load dashboard"},{ status: 500})
    }
}