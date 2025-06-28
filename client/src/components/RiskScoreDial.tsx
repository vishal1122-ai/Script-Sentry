import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle } from "lucide-react";

interface RiskScoreDialProps {
  score: number;
}

export default function RiskScoreDial({ score }: RiskScoreDialProps) {
  const percentage = (score / 10) * 100;
  const strokeDasharray = 220;
  const strokeDashoffset = strokeDasharray - (strokeDasharray * percentage) / 100;
  
  const getRiskLevel = (score: number) => {
    if (score <= 3) return { level: "Low Risk", color: "bg-green-100 text-green-800", stroke: "#10B981" };
    if (score <= 6) return { level: "Medium Risk", color: "bg-orange-100 text-orange-800", stroke: "#F59E0B" };
    return { level: "High Risk", color: "bg-red-100 text-red-800", stroke: "#EF4444" };
  };

  const riskInfo = getRiskLevel(score);

  return (
    <Card className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
      <h3 className="text-lg font-semibold navy mb-4 text-center">Risk Assessment</h3>
      
      <div className="relative w-40 h-40 mx-auto mb-4">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
          <circle 
            cx="50" 
            cy="50" 
            r="35" 
            stroke="#E5E7EB" 
            strokeWidth="8" 
            fill="transparent"
          />
          <circle 
            cx="50" 
            cy="50" 
            r="35" 
            stroke={riskInfo.stroke}
            strokeWidth="8" 
            fill="transparent"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-3xl font-bold" style={{ color: riskInfo.stroke }}>
              {score}
            </div>
            <div className="text-sm text-gray-600">out of 10</div>
          </div>
        </div>
      </div>

      <div className="text-center">
        <Badge className={`${riskInfo.color} inline-flex items-center`}>
          <AlertTriangle className="mr-2 w-3 h-3" />
          {riskInfo.level}
        </Badge>
        <p className="text-sm text-gray-600 mt-2">
          Several clauses require attention before signing
        </p>
      </div>
    </Card>
  );
}
