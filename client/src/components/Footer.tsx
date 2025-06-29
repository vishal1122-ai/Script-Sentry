import { Shield } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-navy rounded-lg flex items-center justify-center">
                <Shield className="text-white w-4 h-4" />
              </div>
              <span className="text-xl font-bold navy">ScriptSentry</span>
            </div>
            <p className="text-gray-600 mb-4 max-w-md">
              AI-powered contract analysis that helps freelancers and creators identify risks 
              and negotiate better terms with confidence.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-sky transition-colors">
                <i className="fab fa-twitter text-xl"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-sky transition-colors">
                <i className="fab fa-linkedin text-xl"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-sky transition-colors">
                <i className="fab fa-github text-xl"></i>
              </a>
            </div>
          </div>
          <div>
            <h4 className="font-semibold navy mb-4">Product</h4>
            <ul className="space-y-2 text-gray-600">
              <li><a href="#" className="hover:text-navy transition-colors">Features</a></li>
              <li><a href="#" className="hover:text-navy transition-colors">Pricing</a></li>
              <li><a href="#" className="hover:text-navy transition-colors">API</a></li>
              <li><a href="#" className="hover:text-navy transition-colors">Security</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold navy mb-4">Support</h4>
            <ul className="space-y-2 text-gray-600">
              <li><a href="#" className="hover:text-navy transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-navy transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-navy transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-navy transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-200 mt-8 pt-8 text-center text-gray-500 text-sm">
          <p>&copy; 2024 ScriptSentry. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
