"use client"

import { useState, useEffect } from 'react'
import {Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function DrawPage() {
    const [draw, setDraw] = useState(null)

    const fetchDraw = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await fetch("/api/draw/result", {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            });
            const data = await res.json();
            setDraw(data);
        } catch(error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchDraw();
    }, []);

    return (

      <div className="space-y-6 p-4 sm:p-6">
        {/* header */}
        <div><h1 className="text-2xl sm:text-3xl font-bold text-white">Latest Draw</h1><p className="text-gray-400">Latest draw results and outcomes</p></div>
        {/* draw card */}
        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader>
            <CardTitle className={"text-white"}>Latest Draw</CardTitle>
          </CardHeader>
          <CardContent>
            {!draw ? (
              <p className="text-gray-400">Loading...</p>
            ) : (
              <div className="space-y-4">
                {/* numbers */}
                <div className="flex gap-2 sm:gap-3 flex-wrap justify-start">
                  {draw.numbers?.map((num) => (
                    <div key={num} className="sm:w-12 sm:h-12 w-10 h-10 rounded-full text-sm sm:text-base bg-green-500/20 border border-green-500 flex items-center justify-center font-semibold text-gray-400">{num}</div>
                  ))}
                </div>
                {/* results */}
                {draw?.results?.length > 0 && (
                  <div className="text-xs sm:text-sm text-gray-400">
                    {draw.results.length} winners in this draw. 
                  </div>
                )}
              </div>
            )}

          </CardContent>
        </Card>

      </div>
    )
}
