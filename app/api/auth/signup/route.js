import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import {connectDB} from "@/lib/db";
import User from "@/models/User";

export async function POST(req) {
    try{
        if(!process.env.JWT_SECRET) throw new Error("JWT_SECRET missing")
        await connectDB();
        const {name, email, password} = await req.json();

        if(!name || !email || !password) {
            return NextResponse.json({
                error: "All fields required"
            }, {status: 400})
        }

        const emailLower = email.toLowerCase()

        const existingUser = await User.findOne({email: emailLower})

        if(existingUser) {
            return NextResponse.json({error: "User already exists"}, {status: 400})
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const isAdmin = email === process.env.ADMIN_EMAIL?.toLowerCase();

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role: isAdmin ? "admin" : "user"
        })

        const token = jwt.sign({id: user._id, role: user.role, email: user.email}, process.env.JWT_SECRET, {expiresIn: "7d"})

        return NextResponse.json({message: "User created", token});
    } catch(error) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}