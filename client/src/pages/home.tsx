import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FileUploader from "@/components/FileUploader";
import LoadingOverlay from "@/components/LoadingOverlay";
import SummaryBox from "@/components/SummaryBox";
import FlaggedClausesList from "@/components/FlaggedClausesList";
import RiskScoreDial from "@/components/RiskScoreDial";
import { Button } from "@/components/ui/button";
import { Download, RotateCcw } from "lucide-react";

export default function Home() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [hasResults, setHasResults] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleFileUpload = async () => {
    setIsAnalyzing(true);
    setProgress(0);
    
    // Simulate analysis progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + Math.random() * 15;
        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsAnalyzing(false);
            setHasResults(true);
          }, 500);
          return 100;
        }
        return newProgress;
      });
    }, 200);
  };

  const handleStartOver = () => {
    setHasResults(false);
    setProgress(0);
  };

  const handleExportPDF = () => {
    // Mock export functionality
    console.log("Exporting PDF...");
  };

  return (
    <div className="min-h-screen bg-light-bg">
      <Header />
      
      <main className="max-w-5xl mx-auto px-6 py-12">
        {!hasResults && (
          <div className="mb-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold navy mb-4">
                Analyze Your Contract in Seconds
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Upload your contract and get an instant AI-powered analysis with risk assessment, 
                plain-English summaries, and red-flagged clauses.
              </p>
            </div>
            
            <FileUploader onFileUpload={handleFileUpload} />
          </div>
        )}

        {hasResults && (
          <div className="animate-fade-in">
            <div className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold navy">Contract Analysis Results</h2>
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
                    className="bg-sky text-white hover:bg-blue-600"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Export PDF
                  </Button>
                </div>
              </div>

              <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1">
                  <RiskScoreDial score={7} />
                </div>
                <div className="lg:col-span-2">
                  <SummaryBox />
                </div>
              </div>

              <div className="mt-8">
                <FlaggedClausesList />
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
