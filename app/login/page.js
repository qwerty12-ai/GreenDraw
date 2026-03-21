"use client"
import React from 'react'
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';
import {Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

import { FaLock } from 'react-icons/fa';
import { Label } from '@/components/ui/label';

export default function LoginPage() {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function parseJWT(token) {
      try {
        return JSON.parse(atob(token.split('.')[1]))
      } catch (error) {
          return null;
      }
    }

    const handleLogin = async () => {
      try {
        const res = await fetch("/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ email, password })
        });
        const data = await res.json();
        if(res.ok) {
          localStorage.setItem("token", data.token);
          const decoded = parseJWT(data.token);
          if (decoded?.role === "admin") router.push("/admin");
          else router.push("/dashboard"); 
        } else {
          alert(data.error)
        }
      } catch(error) {
        alert("Login failed")
      }
  }
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-black via-zinc-900 to-black text-white px-4 py-8">
        <Card className="w-full max-w-md bg-zinc-900/95 border border-zinc-700 shadow-2xl shadow-green-500/20 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-2xl font-bold flex items-center gap-3 text-center justify-center">
              <div className="p-2 bg-green-500/10 rounded-full">
                <FaLock className='text-green-500 text-lg' />
              </div>
              <span className='text-white'>Welcome Back</span>
            </CardTitle>
            <p className="text-sm text-gray-400 text-center mt-2">Sign in to your GreenDraw account</p>
          </CardHeader>
          <CardContent className="space-y-5">
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
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="text-white bg-zinc-800/50 border-zinc-600 focus:border-green-500 focus:ring-1 focus:ring-green-500/50 transition-all duration-200 h-11"
              />
            </div>
            <Button
              onClick={handleLogin}
              className="w-full bg-linear-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 transition-all duration-200 h-11 font-medium shadow-lg"
              disabled={!email || !password}
            >
              Login
            </Button>

            {/* link */}
            <div className="text-center pt-2">
              <p className="text-sm text-gray-400">
                Don&apos;t have an account?{' '}
                <Link href="/signup" className="text-green-400 hover:text-green-300 font-medium transition-colors duration-200">
                  Sign Up
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
}