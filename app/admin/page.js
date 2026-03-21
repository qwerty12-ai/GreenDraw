"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

import { FaPlay, FaUsers } from "react-icons/fa";

export default function AdminPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [authorized, setAuthorized] = useState(null);


  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/auth/login");
      return;
    }

    try {
      const decoded = JSON.parse(atob(token.split(".")[1]));
      if (decoded.role === "admin") {
        setAuthorized(true);
      } else {
        setAuthorized(false)
        router.push("/dashboard")
      }
    } catch (error) {
      console.log("Invalid token");
      setAuthorized(false);
      router.push("/auth/login")
    }
  }, []);

  const runDraw = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      if(!token) {
        alert("Not authenticated");
        return;
      }

      const res = await fetch("/api/draw/run", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      let data;
      try {
        data = await res.json();
      } catch (error) {
        data = {}
      }

      if (!res.ok) throw new Error(data.error || "Failed to run draw");

      alert("Draw executed successfully");
    } catch (error) {
      alert(error.message || "Error running draw");
    } finally {
      setLoading(false);
    }
  };

  if(authorized === null) {
    return <div className="text-white p-6">Checking access...</div>
  }

  if (authorized === false) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white text-center px-4">
        Access Denied
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-4 sm:p-6 space-y-6">
      {/* HEADER */}
      <div className="space-y-1">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
          Admin Dashboard
        </h1>
        <p className="text-gray-400 text-sm sm:text-base">
          Manage draws, users and system overview.
        </p>
        <Button onClick={() => router.push("/dashboard")}>Go to User Dashboard</Button>
      </div>

      <Separator />

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        {/* DRAW CARD */}
        <Card className="bg-zinc-900 border-zinc-800 hover:shadow-lg hover:shadow-green-500/10 transition">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
              <FaPlay className="text-white" /> <span className="text-white">Run Draw</span>
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            <p className="text-xs sm:text-sm text-gray-400">
              Execute a new lottery draw and calculate results.
            </p>

            <Button
              onClick={runDraw}
              className="w-full bg-green-600 hover:bg-green-700"
            >
              {loading ? "Running..." : "Run Draw"}
            </Button>

            <Badge className="bg-zinc-800 text-gray-300 text-xs">
              System Action
            </Badge>
          </CardContent>
        </Card>

        {/* USERS CARD */}
        <Card className="bg-zinc-900 border-zinc-800 hover:shadow-lg hover:shadow-green-500/10 transition">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
              <FaUsers className="text-white" /> <span className="text-white">Users Overview</span>
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            <p className="text-xs sm:text-sm text-gray-400">
              View total users and participation stats.
            </p>

            <div className="text-xl sm:text-2xl font-bold text-gray-400">
              -- users
            </div>

            <Badge className="bg-zinc-800 text-gray-300 text-xs">
              Analytics
            </Badge>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}