import { Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Header() {
  return (
    <header className="bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-navy rounded-lg flex items-center justify-center">
              <Shield className="text-white text-lg" />
            </div>
            <div>
              <h1 className="text-2xl font-bold navy">ScriptSentry</h1>
              <p className="text-gray-600 text-sm">AI-Powered Contract Safety for Freelancers & Creators</p>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <button className="text-gray-600 hover:text-navy transition-colors font-medium">
              Features
            </button>
            <button className="text-gray-600 hover:text-navy transition-colors font-medium">
              Pricing
            </button>
            <Button className="bg-sky text-white hover:bg-blue-600">
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
