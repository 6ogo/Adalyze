import React from 'react';
import { Link } from 'react-router-dom';
import { Linkedin } from 'lucide-react';

export function Footer() {
  const handleLinkClick = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="bg-white border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Adalyze</h3>
            <p className="text-gray-600 text-sm">
              Marketing Analytics platform for data-driven decisions
            </p>
            <a
              href="https://www.linkedin.com/company/adalyze/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700"
            >
              <Linkedin className="h-5 w-5" />
              <span>Follow us on LinkedIn</span>
            </a>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/about" 
                  className="text-gray-600 hover:text-blue-600"
                  onClick={handleLinkClick}
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link 
                  to="/contact" 
                  className="text-gray-600 hover:text-blue-600"
                  onClick={handleLinkClick}
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link 
                  to="/pricing" 
                  className="text-gray-600 hover:text-blue-600"
                  onClick={handleLinkClick}
                >
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/docs" 
                  className="text-gray-600 hover:text-blue-600"
                  onClick={handleLinkClick}
                >
                  Documentation
                </Link>
              </li>
              <li>
                <Link 
                  to="/demo" 
                  className="text-gray-600 hover:text-blue-600"
                  onClick={handleLinkClick}
                >
                  Demo Dashboard
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/privacy" 
                  className="text-gray-600 hover:text-blue-600"
                  onClick={handleLinkClick}
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link 
                  to="/terms" 
                  className="text-gray-600 hover:text-blue-600"
                  onClick={handleLinkClick}
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t">
          <p className="text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} Adalyze. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}