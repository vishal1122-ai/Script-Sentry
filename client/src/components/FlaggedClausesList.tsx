import { Flag, Lightbulb } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Clause {
  title: string;
  risk: string;
  clause: string;
  explanation: string;
}

interface FlaggedClausesListProps {
  clauses: Clause[];
}

export default function FlaggedClausesList({
  clauses,
}: FlaggedClausesListProps) {
  const getStyling = (risk: string) => {
    switch (risk.toLowerCase()) {
      case "high risk":
        return {
          riskColor: "bg-red-100 text-red-800",
          borderColor: "border-red-500",
          bgColor: "bg-red-50",
          textColor: "text-red-700",
          explanationColor: "text-red-600",
        };
      case "medium risk":
        return {
          riskColor: "bg-orange-100 text-orange-800",
          borderColor: "border-orange-500",
          bgColor: "bg-orange-50",
          textColor: "text-orange-700",
          explanationColor: "text-orange-600",
        };
      default:
        return {
          riskColor: "bg-yellow-100 text-yellow-800",
          borderColor: "border-yellow-500",
          bgColor: "bg-yellow-50",
          textColor: "text-yellow-700",
          explanationColor: "text-yellow-600",
        };
    }
  };

  return (
    <Card className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow duration-300">
      <h3 className="text-xl font-legal font-semibold text-slate-800 mb-6 flex items-center">
        <Flag className="mr-2 text-red-500 w-5 h-5" />
        Red-Flagged Clauses
      </h3>

      <div className="space-y-6">
        {clauses.map((clause, index) => {
          const style = getStyling(clause.risk);
          return (
            <div
              key={index}
              className={`border-l-4 ${style.borderColor} ${style.bgColor} p-4 rounded-r-lg`}
            >
              <div className="flex items-start justify-between mb-2">
                <h4
                  className={`font-semibold ${style.textColor
                    .replace("text-", "text-")
                    .replace("-700", "-800")}`}
                >
                  {clause.title}
                </h4>
                <Badge className={style.riskColor}>{clause.risk}</Badge>
              </div>
              <p className={`${style.textColor} text-sm mb-3`}>
                "{clause.clause}"
              </p>
              <div className={`${style.explanationColor} text-sm`}>
                <strong>Why this is risky:</strong> {clause.explanation}
              </div>
            </div>
          );
        })}
      </div>

      {/* Optional default recommendation block */}
      {clauses.length > 0 && (
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <div className="flex items-center mb-2">
            <Lightbulb className="text-sky mr-2 w-5 h-5" />
            <h4 className="font-semibold text-sky">General Recommendations</h4>
          </div>
          <ul className="text-sm text-blue-700 space-y-2">
            <li className="flex items-start">
              <span className="text-sky mr-2">•</span> Negotiate scope or time
              limits of high-risk clauses
            </li>
            <li className="flex items-start">
              <span className="text-sky mr-2">•</span> Add clarifying language
              where terms are vague
            </li>
            <li className="flex items-start">
              <span className="text-sky mr-2">•</span> Seek legal review before
              signing high-risk contracts
            </li>
          </ul>
        </div>
      )}
    </Card>
  );
}
