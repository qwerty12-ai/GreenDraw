"use client";

import StatsCard from "@/components/dashboard/StatsCard";
import DrawCard from "@/components/dashboard/DrawCard";
import { FaCoins, FaCrown } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function DashBoardPage() {
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);
  const [latestDraw, setLatestDraw] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const decoded = JSON.parse(atob(token.split(".")[1]));
      if (decoded.role === "admin") {
        setIsAdmin(true);
      }
    } catch {}
  }, []);

  useEffect(() => {
    fetch("/api/draw/latest")
      .then((res) => res.json())
      .then((data) => {
        if (data?.numbers) {
          setLatestDraw(data.numbers);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <div className="space-y-6">
      
      <div className="space-y-1">
        <h1 className="text-2xl sm:text-3xl font-semibold">
          Dashboard
        </h1>
        <p className="text-gray-400">
          Overview of your activity and performance
        </p>

        {isAdmin && (
          <button
            onClick={() => router.push("/admin")}
            className="mt-3 bg-green-600 px-4 py-2 rounded"
          >
            Go to Admin Dashboard
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <StatsCard title="Subscription" value="Active" icon={<FaCrown />} />
        <StatsCard title="Winnings" value="₹0" icon={<FaCoins />} />
      </div>

      <DrawCard numbers={latestDraw} />
    </div>
  );
}