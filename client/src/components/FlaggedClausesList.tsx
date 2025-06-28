import { Flag, Lightbulb } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function FlaggedClausesList() {
  const flaggedClauses = [
    {
      title: "Overly Broad Non-Compete Clause",
      risk: "High Risk",
      riskColor: "bg-red-100 text-red-800",
      borderColor: "border-red-500",
      bgColor: "bg-red-50",
      textColor: "text-red-700",
      explanationColor: "text-red-600",
      clause: "The Contractor agrees not to engage in any competing business activities in the technology sector for a period of 24 months following contract termination.",
      explanation: "This clause is extremely broad and could prevent you from working on any technology projects for 2 years, potentially violating labor laws in many jurisdictions."
    },
    {
      title: "Unlimited Liability Exposure",
      risk: "Medium Risk",
      riskColor: "bg-orange-100 text-orange-800",
      borderColor: "border-orange-500",
      bgColor: "bg-orange-50",
      textColor: "text-orange-700",
      explanationColor: "text-orange-600",
      clause: "Contractor shall be liable for any and all damages, losses, or expenses arising from breach of confidentiality, without limitation.",
      explanation: "Unlimited liability means you could be responsible for damages far exceeding the contract value. Consider negotiating a liability cap."
    },
    {
      title: "Vague Intellectual Property Assignment",
      risk: "Low Risk",
      riskColor: "bg-yellow-100 text-yellow-800",
      borderColor: "border-yellow-500",
      bgColor: "bg-yellow-50",
      textColor: "text-yellow-700",
      explanationColor: "text-yellow-600",
      clause: "All work product and ideas conceived during the engagement shall become the exclusive property of the Client.",
      explanation: "This could include ideas unrelated to the project or pre-existing intellectual property. Clarify scope of IP assignment."
    }
  ];

  return (
    <Card className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
      <h3 className="text-lg font-semibold navy mb-6 flex items-center">
        <Flag className="mr-2 text-red-500 w-5 h-5" />
        Red-Flagged Clauses
      </h3>

      <div className="space-y-6">
        {flaggedClauses.map((clause, index) => (
          <div key={index} className={`border-l-4 ${clause.borderColor} ${clause.bgColor} p-4 rounded-r-lg`}>
            <div className="flex items-start justify-between mb-2">
              <h4 className={`font-semibold ${clause.textColor.replace('text-', 'text-').replace('-700', '-800')}`}>
                {clause.title}
              </h4>
              <Badge className={clause.riskColor}>
                {clause.risk}
              </Badge>
            </div>
            <p className={`${clause.textColor} text-sm mb-3`}>
              "{clause.clause}"
            </p>
            <div className={`${clause.explanationColor} text-sm`}>
              <strong>Why this is risky:</strong> {clause.explanation}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <div className="flex items-center mb-2">
          <Lightbulb className="text-sky mr-2 w-5 h-5" />
          <h4 className="font-semibold text-sky">Recommendations</h4>
        </div>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• Request to limit non-compete clause to direct competitors only</li>
          <li>• Negotiate a liability cap equal to the contract value</li>
          <li>• Clarify IP assignment scope to exclude pre-existing work</li>
          <li>• Consider adding a severability clause to preserve the rest of the contract</li>
        </ul>
      </div>
    </Card>
  );
}
