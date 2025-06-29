import { FileText } from "lucide-react";
import { Card } from "@/components/ui/card";

export default function SummaryBox() {
  return (
    <Card className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow duration-300">
      <h3 className="text-xl font-legal font-semibold text-slate-800 mb-4 flex items-center">
        <FileText className="mr-2 text-sky w-5 h-5" />
        Contract Summary
      </h3>
      <div className="prose text-gray-700 leading-relaxed">
        <p className="mb-4">
          This is a <strong>Non-Disclosure Agreement (NDA)</strong> between a freelancer and client for a 
          mobile app development project. The contract establishes confidentiality terms for proprietary 
          information shared during the engagement.
        </p>
        <p className="mb-4">
          <strong>Key Terms:</strong> The agreement includes a 2-year confidentiality period, mutual 
          non-disclosure obligations, and covers technical specifications, business strategies, and 
          customer data. Payment terms specify $5,000 upon signing with deliverables due within 90 days.
        </p>
        <p>
          <strong>Notable Provisions:</strong> Contains broad intellectual property clauses and 
          non-compete restrictions that may limit future work opportunities in the mobile app space.
        </p>
      </div>
    </Card>
  );
}
