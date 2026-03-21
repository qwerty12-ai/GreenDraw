import {Card, CardContent} from "@/components/ui/card";

export default function ScoreList({scores}) {
    return (
        <Card className="bg-zinc-900 border-zinc-800">
            <CardContent className="p-5 space-y-3">
                <h2 className="text-lg font-semibold text-white">Your scores</h2>
                {!scores || scores.length === 0 ? (
                    <p className="text-gray-400 text-sm">No scores added yet</p>
                ):(
                    <div className="flex sm:gap-3 gap-2 flex-wrap">
                        {scores.map((s,i) => (
                            <div key={s._id || i} className="w-10 h-10 sm:w-12 sm:h-12 text-sm sm:text-base rounded-full bg-green-500/20 border border-green-500 flex items-center justify-center font-semibold text-gray-400">
                                {s.value}
                            </div>
                        ))}
                    </div>
                )}
            </CardContent>
        </Card>
    )
}