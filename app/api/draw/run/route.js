import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { verifyToken } from "@/lib/auth";

import User from "@/models/User";
import Draw from "@/models/Draw";

export async function POST(req) {
  try {
    await connectDB();

    const decoded = verifyToken(req);

    if (!decoded) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const adminUser = await User.findById(decoded.id);

    if (!adminUser || adminUser.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const numberSet = new Set();

    while (numberSet.size < 5) {
      numberSet.add(Math.floor(Math.random() * 45) + 1);
    }

    const drawNumbers = Array.from(numberSet);

    const users = await User.find();

    const results = [];

    for (let user of users) {
      const userScores = (user.scores || []).map((s) => s.value);

      const matchCount = userScores.filter((num) =>
        drawNumbers.includes(num)
      ).length;

      let prize = 0;

      
      if (matchCount === 5) prize = 1000;
      else if (matchCount === 4) prize = 500;
      else if (matchCount === 3) prize = 200;

      const charityPercent = user.charity?.percentage || 0;
      const charityAmount = ((prize * charityPercent) / 100);
      const finalAmount = prize - charityAmount;

      if (matchCount >= 3) {
        results.push({
          userId: user._id,
          matchCount,
          prize,
        });

        if(matchCount >= 3) {
          user.winnings.push({
            drawId: null,
            amount: finalAmount,
            status: "pending"
          })
        }

        await user.save();
      }
    }

    const draw = await Draw.create({
      numbers: drawNumbers,
      results,
    });

    for (let result of results) {
      await User.updateOne(
        { _id: result.userId },
        {
          $set: {
            "winnings.$[elem].drawId": draw._id,
          },
        },
        {
          arrayFilters: [
            {
              "elem.drawId": null,
              "elem.amount": result.prize,
            },
          ],
        }
      );
    }

    return NextResponse.json({
      message: "Draw executed successfully",
      draw,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Draw failed" },
      { status: 500 }
    );
  }
}