import { Card } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";

interface RecommendationsListProps {
  recommendations: string[];
}

export default function RecommendationsList({
  recommendations,
}: RecommendationsListProps) {
  if (!recommendations || recommendations.length === 0) return null;

  return (
    <Card className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mt-10">
      <h3 className="text-xl font-legal font-semibold text-slate-800 mb-4">
        General Recommendations
      </h3>
      <ul className="space-y-3">
        {recommendations.map((rec, index) => (
          <li key={index} className="flex items-start space-x-3">
            <CheckCircle2 className="text-green-600 mt-1 w-5 h-5 flex-shrink-0" />
            <span className="text-slate-700">{rec}</span>
          </li>
        ))}
      </ul>
    </Card>
  );
}
