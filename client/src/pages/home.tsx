import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FileUploader from "@/components/FileUploader";
import LoadingOverlay from "@/components/LoadingOverlay";
import SummaryBox from "@/components/SummaryBox";
import FlaggedClausesList from "@/components/FlaggedClausesList";
import RiskScoreDial from "@/components/RiskScoreDial";
import RecommendationsList from "@/components/RecommendationsList";
import { Button } from "@/components/ui/button";
import { Download, RotateCcw, FileDown } from "lucide-react";

export default function Home() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [hasResults, setHasResults] = useState(false);
  const [progress, setProgress] = useState(0);
  const [summaryText, setSummaryText] = useState("");
  const [riskScore, setRiskScore] = useState(0);
  const [recommendations, setRecommendations] = useState<string[]>([]);
  const [flaggedClauses, setFlaggedClauses] = useState<
    { title: string; clause: string; risk: string; explanation: string }[]
  >([]);

  const handleFileUpload = async (file: File) => {
    setIsAnalyzing(true);
    setProgress(0);

    try {
      const formData = new FormData();
      formData.append("document", file);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || "Analysis failed");
      }

      // 🧠 Use structured fields directly
      setSummaryText(result.summary || "No summary found.");
      setRiskScore(result.riskScore || 0);

      const flagged = result.redFlags.map((item: any) => ({
        title: item.clause,
        clause: item.text,
        risk: "High Risk", // Static for now; can be made dynamic
        explanation: item.reason,
      }));

      setFlaggedClauses(flagged);
      setRecommendations(result.recommendations || []);
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
    console.log("Exporting PDF...");
  };

  const handleDownloadReport = () => {
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
                  <RiskScoreDial score={riskScore} />
                </div>
                <div className="lg:col-span-2 animate-stagger-2">
                  <SummaryBox content={summaryText} />
                </div>
              </div>

              <div className="mt-8 animate-stagger-3">
                <FlaggedClausesList clauses={flaggedClauses} />
              </div>

              <div className="mt-8 animate-stagger-4">
                <RecommendationsList recommendations={recommendations} />
              </div>

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
