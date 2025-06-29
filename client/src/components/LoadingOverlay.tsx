import { Settings } from "lucide-react";

interface LoadingOverlayProps {
  progress: number;
}

export default function LoadingOverlay({ progress }: LoadingOverlayProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 max-w-md mx-4 text-center">
        <div className="w-16 h-16 bg-sky bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Settings className="text-sky text-2xl w-8 h-8 animate-spin-slow" />
        </div>
        <h3 className="text-xl font-semibold navy mb-2">Analyzing Contract</h3>
        <p className="text-gray-600 mb-4">
          Our AI is reviewing your document for risks and generating insights...
        </p>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-sky h-2 rounded-full transition-all duration-1000" 
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>
        <p className="text-sm text-gray-500 mt-2">This usually takes 10-30 seconds</p>
      </div>
    </div>
  );
}
