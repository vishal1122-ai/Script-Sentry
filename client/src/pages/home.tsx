import { useState } from "react";
import axios from "axios";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FileUploader from "@/components/FileUploader";
import LoadingOverlay from "@/components/LoadingOverlay";
import SummaryBox from "@/components/SummaryBox";
import FlaggedClausesList from "@/components/FlaggedClausesList";
import RiskScoreDial from "@/components/RiskScoreDial";
import { Button } from "@/components/ui/button";
import { Download, RotateCcw, FileDown } from "lucide-react";

export default function Home() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [hasResults, setHasResults] = useState(false);
  const [progress, setProgress] = useState(0);
  const [analysisText, setAnalysisText] = useState(""); // raw response
  const [summaryText, setSummaryText] = useState("");
  const [riskScore, setRiskScore] = useState(0);
  const [flaggedClauses, setFlaggedClauses] = useState<
    { title: string; clause: string; risk: string; explanation: string }[]
  >([]);

  const handleFileUpload = async (file: File) => {
    setIsAnalyzing(true);
    setProgress(0);

    try {
      // Upload to backend
      const formData = new FormData();
      formData.append("document", file);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (!response.ok || !data.analysis) {
        throw new Error(data.error || "Analysis failed");
      }

      const result: string = data.analysis;
      console.log(result);
      // Parse LLM output
      const summaryMatch = result.match(
        /Overall summary.*?\n([\s\S]*?)\n?\d{1,2}/i
      );
      const riskMatch = result.match(/Risk\s*Score\s*[:\-]?\s*(\d+(\.\d+)?)/i);
      const flagged = [...result.matchAll(/\*\*(.*?)\*\*: (.*?)\n/g)].map(
        (match) => ({
          title: match[1],
          clause: match[2],
          risk: "High Risk", // You can improve this with smarter parsing later
          explanation: "LLM flagged this clause as potentially risky.",
        })
      );

      setSummaryText(summaryMatch?.[1]?.trim() || "No summary found.");
      setRiskScore(Number(riskMatch?.[1] || 0));
      setFlaggedClauses(flagged);
      setHasResults(true);
    } catch (error) {
      console.error("Error analyzing file:", error);
      alert("File analysis failed. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleStartOver = () => {
    setHasResults(false);
    setProgress(0);
  };

  const handleExportPDF = () => {
    // Mock export functionality
    console.log("Exporting PDF...");
  };

  const handleDownloadReport = () => {
    // Mock download full report functionality
    console.log("Downloading full report...");
  };

  return (
    <div className="min-h-screen bg-light-bg">
      <Header hasResults={hasResults} onStartOver={handleStartOver} />

      <main className="max-w-5xl mx-auto px-6 py-12">
        {!hasResults && (
          <div className="mb-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold navy mb-4">
                Analyze Your Contract in Seconds
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Upload your contract and get an instant AI-powered analysis with
                risk assessment, plain-English summaries, and red-flagged
                clauses.
              </p>
            </div>

            <FileUploader onFileUpload={handleFileUpload} />
          </div>
        )}

        {hasResults && (
          <div className="animate-fade-in">
            <div className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-legal font-bold text-slate-800">
                  Contract Analysis Results
                </h2>
                <div className="flex space-x-3">
                  <Button
                    variant="outline"
                    onClick={handleStartOver}
                    className="bg-gray-100 text-navy hover:bg-gray-200"
                  >
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Start Over
                  </Button>
                  <Button
                    onClick={handleExportPDF}
                    className="bg-sky text-white hover:bg-blue-600 border border-sky-200"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Export PDF
                  </Button>
                </div>
              </div>

              <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1 animate-stagger-1">
                  console.log(riskScore)
                  <RiskScoreDial score={riskScore} />
                </div>
                <div className="lg:col-span-2 animate-stagger-2">
                  <SummaryBox content={summaryText} />
                </div>
              </div>

              <div className="mt-8 animate-stagger-3">
                <FlaggedClausesList clauses={flaggedClauses} />
              </div>

              {/* Download Full Report Button */}
              <div className="mt-8 text-center">
                <Button
                  onClick={handleDownloadReport}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 text-lg"
                >
                  <FileDown className="w-5 h-5 mr-2" />
                  📄 Download Full Report
                </Button>
                <p className="text-sm text-gray-500 mt-2">
                  Get a comprehensive PDF with detailed analysis and
                  recommendations
                </p>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />

      {isAnalyzing && <LoadingOverlay progress={progress} />}
    </div>
  );
}
