import {Card, CardContent} from "@/components/ui/card"

const StatsCard = ({title, value, icon}) => {
  return (
    <Card className="bg-zinc-900 border-zinc-800 hover:shadow-lg hover:shadow-green-500/10 transition-all">
      <CardContent className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="sm:text-sm text-xs text-white">{title}</p>
          <h2 className="text-lg sm:text-2xl font-bold mt-1 text-gray-400">{value || "--"}</h2>
        </div>
        <div className="text-green-500 text-xl sm:text-2xl self-end sm:self-auto">{icon}</div>
      </CardContent>
    </Card>
  )
}

export default StatsCard