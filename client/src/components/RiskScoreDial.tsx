import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, CheckCircle, AlertCircle } from "lucide-react";

interface RiskScoreDialProps {
  score: number; // Pass actual score (like 7.5, 6, etc.)
}

export default function RiskScoreDial({ score }: RiskScoreDialProps) {
  const clampedScore = Math.min(Math.max(score, 0), 10); // Ensure score is between 0–10
  const percentage = (clampedScore / 10) * 100;
  const strokeDasharray = 220;
  const strokeDashoffset =
    strokeDasharray - (strokeDasharray * percentage) / 100;

  const getRiskLevel = (score: number) => {
    if (score <= 3)
      return {
        level: "Low Risk",
        color: "bg-green-100 text-green-800",
        stroke: "#10B981",
        icon: CheckCircle,
        message: "✅ Low Risk: This contract looks safe to sign.",
        messageColor: "text-green-600",
      };
    if (score <= 6)
      return {
        level: "Moderate Risk",
        color: "bg-orange-100 text-orange-800",
        stroke: "#F59E0B",
        icon: AlertCircle,
        message: "⚠️ Moderate Risk: Review flagged clauses carefully.",
        messageColor: "text-orange-600",
      };
    return {
      level: "High Risk",
      color: "bg-red-100 text-red-800",
      stroke: "#EF4444",
      icon: AlertTriangle,
      message: "⚠️ High Risk: Review flagged clauses before signing.",
      messageColor: "text-red-600",
    };
  };

  const riskInfo = getRiskLevel(clampedScore);
  const IconComponent = riskInfo.icon;

  return (
    <Card className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow duration-300">
      <h3 className="text-xl font-legal font-semibold text-slate-800 mb-4 text-center">
        Risk Assessment
      </h3>

      <div className="relative w-44 h-44 mx-auto mb-4">
        <svg
          className="w-full h-full transform -rotate-90"
          viewBox="0 0 100 100"
        >
          <circle
            cx="50"
            cy="50"
            r="35"
            stroke="#E5E7EB"
            strokeWidth="6"
            fill="transparent"
          />
          <circle
            cx="50"
            cy="50"
            r="35"
            stroke={riskInfo.stroke}
            strokeWidth="6"
            fill="transparent"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
            style={{ filter: `drop-shadow(0 0 4px ${riskInfo.stroke}40)` }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div
              className="text-4xl font-bold mb-1"
              style={{ color: riskInfo.stroke }}
            >
              {clampedScore}
            </div>
            <div className="text-sm text-gray-600">out of 10</div>
          </div>
        </div>
      </div>

      <div className="text-center">
        <Badge className={`${riskInfo.color} inline-flex items-center mb-3`}>
          <IconComponent className="mr-2 w-3 h-3" />
          {riskInfo.level}
        </Badge>
        <p className={`text-sm font-medium mt-1 ${riskInfo.messageColor}`}>
          {riskInfo.message}
        </p>
      </div>
    </Card>
  );
}
