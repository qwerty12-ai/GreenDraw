import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const DrawCard = ({ numbers = [] }) => {
  return (
    <Card className="bg-zinc-900 border-zinc-800 hover:shadow-lg hover:shadow-green-500/10 transition">
      
      <CardHeader>
        <CardTitle className="text-white text-lg sm:text-xl">
          Latest Draw
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="flex flex-wrap gap-2 sm:gap-3">
          {numbers.length === 0 ? (
            <p className="text-gray-400 text-sm">No draw yet</p>
          ) : (
            numbers.map((num) => (
              <div
                key={num}
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-green-500/20 border border-green-500 flex items-center justify-center text-white text-sm sm:text-lg font-semibold"
              >
                {num}
              </div>
            ))
          )}
        </div>
      </CardContent>

    </Card>
  );
};

export default DrawCard;
