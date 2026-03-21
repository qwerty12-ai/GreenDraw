"use client"

import { useState, useEffect } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function CharitySelector() {
    const [selected, setSelected] = useState(null);
    const [percentage, setPercentage] = useState(10);
    const [charities, setCharities] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCharities = async () => {
            try {
                const res = await fetch("/api/charity/get");
                const data = await res.json();
                setCharities(data.charities);
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        };

        fetchCharities();
    }, []);

    const handleSave = async () => {
        if (!selected) return alert("Select a charity");

        await fetch("/api/user/charity", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify({
                charityId: selected,
                percentage: Number(percentage)
            }),
        });

        alert("Preference saved");
    };

    return (
        <div className="space-y-6">

            {loading ? (
                <p className="text-gray-400">Loading charities...</p>
            ) : (

                <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {charities.map(charity => (    
                        <Card
                            key={charity._id}
                            onClick={() => setSelected(charity._id)}
                            className={`cursor-pointer border transition ${
                                selected === charity._id
                                ? "border-green-500 bg-green-500/10"
                                : "border-zinc-800 bg-zinc-900 hover:bg-zinc-800"
                            }`}
                        >
                            <CardContent className="p-3 sm:p-4 space-y-2">
                                
                                {charity.image && (
                                    <div className="relative w-full h-28 sm:h-32">
                                        <Image
                                            src={charity.image}
                                            alt="Charity"
                                            fill
                                            className="rounded-lg object-cover"
                                        />
                                    </div>
                                )}

                                <h3 className="font-semibold text-white">
                                    {charity.name}
                                </h3>

                                <p className="text-sm text-gray-400">
                                    {charity.description}
                                </p>

                            </CardContent>
                        </Card>
                    ))}
                </div>

                <div className="space-y-2">
                    <label className="text-sm text-gray-400">
                        Donation Percentage: {percentage}%
                    </label>

                    <input 
                        type="range"
                        min="10"
                        max="100"
                        value={percentage}
                        onChange={(e) => setPercentage(Number(e.target.value))}
                        className="w-full"
                    />
                </div>

                <Button 
                    onClick={handleSave}
                    className="bg-green-600 hover:bg-green-700 w-full"
                >
                    Save Preference
                </Button>
                </>
            )}
        </div>
    );
}