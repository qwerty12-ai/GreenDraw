"use client";

import { useEffect, useState } from "react";
import CharitySelector from "@/components/dashboard/CharitySelector";

export default function CharityPage() {
  const [charities, setCharities] = useState([]);

  useEffect(() => {
    const fetchCharities = async () => {
      try {
        const res = await fetch("/api/charity/get");
        const data = await res.json();
        setCharities(data.charities || []);
      } catch (err) {
        console.log(err);
      }
    };

    fetchCharities();
  }, []);

  return (
    <div className="space-y-6 p-4 sm:p-6">
      
      {/* header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white">
          Charity Selection
        </h1>
        <p className="text-gray-400 text-sm sm:text-base">
          Choose a cause and contribute automatically
        </p>
      </div>

      {/* selector */}
      <CharitySelector charities={charities} />

    </div>
  );
}