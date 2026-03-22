"use client"
import {useState, useEffect} from 'react'
import ScoreInput from '@/components/dashboard/ScoreInput';
import ScoreList from '@/components/dashboard/ScoreList';

export default function ScoresPage() {
  const [scores, setScores] = useState([])

  const fetchScores = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch("/api/score/get", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        method: "GET"
      })
      const data = await res.json();
      setScores(data.scores || [])
    } catch(error) {
      console.log(error)
    }
  }

  const addScore = async(value) => {
    try {
      const res = await fetch("/api/score/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({value})
      });

      const data = await res.json();
      setScores(data.scores);
    } catch(error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchScores();
  }, [])

  return (
    <div className="space-y-6 p-4 sm:p-6">

      {/* header */}
      <div><h1 className="text-2xl sm:text-3xl font-bold text-white">Scores</h1><p className="text-gray-400">Add and manage your latest 5 scores</p></div>
      {/* input */}
      <ScoreInput onAdd={addScore} />
      {/* list */}
      <ScoreList scores={scores} />
    </div>
  )
}
