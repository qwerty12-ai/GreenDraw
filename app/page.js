import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white px-6 py-10 space-y-8">
      <div className="max-w-5xl mx-auto">
        <section className="text-center space-y-5">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Play. Win. <span className="text-green-500">Give Back.</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Enter your golf scores, participate in draws, and support a charity of your choice. Your performance can help local communities.
          </p>
          <div className="flex items-center justify-center gap-3">
            <Link href="/signup">
              <Button className="bg-green-500 hover:bg-green-600 text-white px-5 py-2">Get Started</Button>
            </Link>
            <Link href="/login">
              <Button className="bg-zinc-800 hover:bg-zinc-700 text-white px-5 py-2">Log In</Button>
            </Link>
          </div>
        </section>

        <section className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-zinc-950 border-zinc-800">
            <CardContent>
              <h3 className="text-lg font-semibold text-white">Track Scores</h3>
              <p className="text-gray-300 text-sm mt-2">Save your latest 5 rounds and measure progress each week.</p>
            </CardContent>
          </Card>
          <Card className="bg-zinc-950 border-zinc-800">
            <CardContent>
              <h3 className="text-lg font-semibold text-white">Monthly Draws</h3>
              <p className="text-gray-300 text-sm mt-2">Every submission enters you into the next prize draw automatically.</p>
            </CardContent>
          </Card>
          <Card className="bg-zinc-950 border-zinc-800">
            <CardContent>
              <h3 className="text-lg font-semibold text-white">Support Charity</h3>
              <p className="text-gray-300 text-sm mt-2">Choose a cause to receive a portion of winnings automatically.</p>
            </CardContent>
          </Card>
        </section>

        <section className="mt-10 bg-zinc-900 border border-zinc-800 rounded-xl p-6">
          <h2 className="text-2xl font-bold">Your Dashboard</h2>
          <p className="text-gray-400 mt-2">Access your stats, draw history, scores, and charity settings from the dashboard.</p>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-zinc-800 border-zinc-700">
              <CardContent>
                <h4 className="text-md text-white">Dashboard</h4>
                <p className="text-gray-400">Overview and summary of performance.</p>
              </CardContent>
            </Card>
            <Card className="bg-zinc-800 border-zinc-700">
              <CardContent>
                <h4 className="text-md text-white">Scores</h4>
                <p className="text-gray-400">Add and manage your top scores.</p>
              </CardContent>
            </Card>
            <Card className="bg-zinc-800 border-zinc-700">
              <CardContent>
                <h4 className="text-md text-white">Winnings</h4>
                <p className="text-gray-400">Track payouts and charitable contributions.</p>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="mt-10 rounded-xl border border-green-600 bg-black/60 p-6 text-center">
          <h2 className="text-2xl font-bold text-green-400">Ready for the next draw?</h2>
          <p className="text-gray-400 mt-2">Log your latest scores now and increase your chances to win. Join our community-led charity impact program.</p>
          <div className="mt-4 flex flex-wrap justify-center gap-3">
            <Link href="/signup">
              <Button className="bg-green-500 hover:bg-green-600 text-white px-6 py-2">Start Playing</Button>
            </Link>
            <Link href="/dashboard">
              <Button className="bg-zinc-800 hover:bg-zinc-700 text-white px-6 py-2">Go to Dashboard</Button>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
