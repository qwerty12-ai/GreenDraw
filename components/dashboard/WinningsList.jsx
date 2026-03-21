import {Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function WinningsList({winnings = []}) {
    return (
        <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader>
                <CardTitle className="text-white">Your Winnings</CardTitle>
            </CardHeader>
            <CardContent>
                {winnings.length === 0 ? (
                    <p className="text-gray-400 text-sm">
                        No winnings yet
                    </p>
                ):(
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="text-gray-400 border-b border-zinc-800">
                                <tr>
                                    <th className="text-left py-2">Match</th>
                                    <th className="text-left py-2">Amount</th>
                                    <th className="text-left py-2">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {winnings.map((win, i) =>  (
                                    <tr key={i} className="border-b border-zinc-800 hover:bg-zinc-800/40 transition">
                                        <td className="py-3 text-gray-400">{win.matchCount} Match</td>
                                        <td className="py-3 text-gray-400">₹{win.amount}</td>
                                        <td className="py-3">
                                            <Badge className={win.status === "paid"?"bg-green-600":"bg-yellow-600"}>
                                                {win.status}
                                            </Badge>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}