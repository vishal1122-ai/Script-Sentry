import { FileText } from "lucide-react";
import { Card } from "@/components/ui/card";
import ReactMarkdown from "react-markdown";

interface SummaryBoxProps {
  content: string;
}

export default function SummaryBox({ content }: SummaryBoxProps) {
  return (
    <Card className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow duration-300">
      <h3 className="text-xl font-legal font-semibold text-slate-800 mb-4 flex items-center">
        <FileText className="mr-2 text-sky w-5 h-5" />
        Contract Summary
      </h3>
      <div className="prose prose-slate max-w-none text-gray-700 leading-relaxed">
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
    </Card>
  );
}
