"use client"
import React from 'react'
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';
import {Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

import { FaUserPlus } from 'react-icons/fa';
import { Label } from '@/components/ui/label';

export default function SignupPage() {
    const router = useRouter();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignup = async () => {
      try {
        const res = await fetch("/api/auth/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ name, email, password })
        });
        const data = await res.json();
        if(res.ok) {
          alert("Account Created");
          router.push("/login");
        } else {
          alert(data.error)
        }
      } catch(error) {
        alert("Signup failed")
      }
    }

    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-black via-zinc-900 to-black text-white px-4 py-8">
        <Card className="w-full max-w-md bg-zinc-900/95 border border-zinc-700 shadow-2xl shadow-green-500/20 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-2xl font-bold flex items-center gap-3 text-center justify-center">
              <div className="p-2 bg-green-500/10 rounded-full">
                <FaUserPlus className="text-green-500 text-lg" />
              </div>
              <span className='text-white'>Create Account</span>
            </CardTitle>
            <p className="text-sm text-gray-400 text-center mt-2">Join GreenDraw and start making a difference</p>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium text-gray-200">Full Name</Label>
              <Input
                id="name"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="text-white bg-zinc-800/50 border-zinc-600 focus:border-green-500 focus:ring-1 focus:ring-green-500/50 transition-all duration-200 h-11"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-gray-200">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="text-white bg-zinc-800/50 border-zinc-600 focus:border-green-500 focus:ring-1 focus:ring-green-500/50 transition-all duration-200 h-11"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium text-gray-200">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="text-white bg-zinc-800/50 border-zinc-600 focus:border-green-500 focus:ring-1 focus:ring-green-500/50 transition-all duration-200 h-11"
              />
            </div>
            <Button
              onClick={handleSignup}
              className="w-full bg-linear-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 transition-all duration-200 h-11 font-medium shadow-lg"
              disabled={!name || !email || !password}
            >
              Create Account
            </Button>

            {/* link */}
            <div className="text-center pt-2">
              <p className="text-sm text-gray-400">
                Already have an account?{' '}
                <Link href="/login" className="text-green-400 hover:text-green-300 font-medium transition-colors duration-200">
                  Log In
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
}
