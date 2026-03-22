"use client";

import { useState, useEffect } from "react";
import WinningsList from "@/components/dashboard/WinningsList";

export default function WinningsPage() {
  const [winnings, setWinnings] = useState([]);

  useEffect(() => {
    const fetchWinnings = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch("/api/winnings", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();        

        setWinnings(Array.isArray(data.winnings)? data.winnings: data.winnings?.history || []);
      } catch (error) {
        console.log(error);
      }
    };

    fetchWinnings();
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Winnings</h1>
        <p className="text-gray-400">Track your rewards and payouts</p>
      </div>

      <WinningsList winnings={winnings} />
    </div>
  );
}
