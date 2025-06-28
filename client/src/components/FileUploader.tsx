import { useRef } from "react";
import { CloudUpload, File } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface FileUploaderProps {
  onFileUpload: () => void;
}

export default function FileUploader({ onFileUpload }: FileUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.currentTarget.classList.add('border-sky', 'bg-blue-50');
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.currentTarget.classList.remove('border-sky', 'bg-blue-50');
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.currentTarget.classList.remove('border-sky', 'bg-blue-50');
    onFileUpload();
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onFileUpload();
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <Card className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 mb-6">
      <div 
        className="border-2 border-dashed border-gray-300 rounded-xl p-12 text-center hover:border-sky hover:bg-blue-50 transition-all duration-300 cursor-pointer"
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={triggerFileInput}
      >
        <div className="w-16 h-16 bg-sky bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
          <CloudUpload className="text-sky text-2xl w-8 h-8" />
        </div>
        <h3 className="text-xl font-semibold navy mb-2">Drop your contract here</h3>
        <p className="text-gray-600 mb-4">Or click to browse files</p>
        <p className="text-sm text-gray-500">Supports PDF and DOCX files up to 10MB</p>
        <div className="mt-3 flex items-center justify-center">
          <span className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
            🔒 Your file stays 100% private. It's never stored or shared.
          </span>
        </div>
        <input 
          ref={fileInputRef}
          type="file" 
          className="hidden" 
          accept=".pdf,.docx" 
          onChange={handleFileSelect}
        />
      </div>

      <div className="flex items-center justify-center mt-6">
        <div className="flex items-center space-x-4">
          <hr className="w-16 border-gray-300" />
          <span className="text-gray-500 text-sm font-medium">OR</span>
          <hr className="w-16 border-gray-300" />
        </div>
      </div>

      <div className="text-center mt-6">
        <Button 
          variant="outline"
          onClick={onFileUpload}
          className="bg-gray-100 text-navy hover:bg-gray-200"
        >
          <File className="mr-2 w-4 h-4" />
          Try with Sample NDA
        </Button>
      </div>
    </Card>
  );
}
