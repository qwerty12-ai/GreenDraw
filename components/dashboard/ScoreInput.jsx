"use client"

import {useState} from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ScoreInput({onAdd}) {
    const [value, setValue] = useState("");

    const handleSubmit = async () => {
        if(!value) return alert("Enter a number");

        const num = Number(value)

        if(num < 1 || num > 45) {
            return alert("Score must be between 1-45")
        }

        await onAdd(num);
        setValue("")
    }

    return (
        <div className="flex flex-col sm:flex-row gap-3">
            <Input 
                className="bg-zinc-900 border-zinc-700 w-full"
                type="number"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Enter score (1-45)"
            />
            <Button onClick={handleSubmit} className="bg-green-600 hover:bg-green-700 w-full sm:w-auto">Add</Button>
        </div>
    )
}