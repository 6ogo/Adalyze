import React, { useState } from 'react';
import { Check, X, Calculator } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Pricing() {
  const [users, setUsers] = useState(1);
  const [spend, setSpend] = useState(100000);
  const [integrations, setIntegrations] = useState(5);

  const calculateEnterpriseCost = () => {
    const basePrice = 800; // Base price for enterprise
    const userCost = users * 50; // $50 per user
    const integrationCost = integrations * 150; // $30 per integration
    const spendMultiplier = Math.floor(spend / 20000) * 100; // $100 for every $100k spent

    return basePrice + userCost + integrationCost + spendMultiplier;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Pricing Plans</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose the perfect plan for your marketing analytics needs
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Basic Plan */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Basic</h2>
            <p className="text-4xl font-bold text-blue-600 mb-6">$69<span className="text-lg text-gray-600">/mo</span></p>
            
            <div className="space-y-4 mb-8">
              <Feature available={true} text="1 User Account" />
              <Feature available={true} text="Up to 3 Platform Integrations" />
              <Feature available={true} text="Basic Analytics Dashboard" />
              <Feature available={true} text="Cross-Platform Comparison" />
              <Feature available={true} text="Basic ROI Tracking" />
              <Feature available={false} text="Regression Analysis" />
              <Feature available={false} text="Media Mix Modeling" />
              <Feature available={false} text="Custom Reports" />
            </div>

            <p className="text-sm text-gray-600 mb-6">
              Ideal for companies spending under $25,000/month on marketing
            </p>

            <Link
              to="/contact"
              className="block w-full text-center bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
            >
              Get Started
            </Link>
          </div>

          {/* Professional Plan */}
          <div className="bg-white rounded-lg shadow-lg p-8 border-2 border-blue-600 transform scale-105">
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <span className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm">Popular</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Professional</h2>
            <p className="text-4xl font-bold text-blue-600 mb-6">$139<span className="text-lg text-gray-600">/mo</span></p>
            
            <div className="space-y-4 mb-8">
              <Feature available={true} text="1 User Account" />
              <Feature available={true} text="Up to 5 Platform Integrations" />
              <Feature available={true} text="Advanced Analytics Dashboard" />
              <Feature available={true} text="Cross-Platform Comparison" />
              <Feature available={true} text="Advanced ROI Tracking" />
              <Feature available={true} text="Basic Regression Analysis" />
              <Feature available={true} text="Performance Predictions" />
              <Feature available={false} text="Media Mix Modeling" />
            </div>

            <p className="text-sm text-gray-600 mb-6">
              Perfect for companies spending under $50,000/month on marketing
            </p>

            <Link
              to="/contact"
              className="block w-full text-center bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
            >
              Get Started
            </Link>
          </div>

          {/* Enterprise Plan */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Enterprise</h2>
            <div className="text-4xl font-bold text-blue-600 mb-6">
              Custom
              <div className="text-lg text-gray-600">Contact for pricing</div>
            </div>

            <div className="space-y-4 mb-8">
              <Feature available={true} text="Unlimited Users" />
              <Feature available={true} text="Unlimited Integrations" />
              <Feature available={true} text="Enterprise Analytics Suite" />
              <Feature available={true} text="Advanced Regression Analysis" />
              <Feature available={true} text="Media Mix Modeling" />
              <Feature available={true} text="Custom Reports" />
              <Feature available={true} text="Dedicated Support" />
              <Feature available={true} text="API Access" />
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-4">Price Calculator</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-2">Number of Users</label>
                  <input
                    type="number"
                    min="1"
                    value={users}
                    onChange={(e) => setUsers(parseInt(e.target.value) || 1)}
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-2">Monthly Marketing Spend ($)</label>
                  <input
                    type="number"
                    min="100000"
                    step="10000"
                    value={spend}
                    onChange={(e) => setSpend(parseInt(e.target.value) || 100000)}
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-2">Number of Integrations</label>
                  <input
                    type="number"
                    min="1"
                    value={integrations}
                    onChange={(e) => setIntegrations(parseInt(e.target.value) || 1)}
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </div>
                <div className="bg-gray-50 p-4 rounded-md">
                  <p className="text-lg font-semibold">Estimated Monthly Cost</p>
                  <p className="text-3xl font-bold text-blue-600">${calculateEnterpriseCost()}</p>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-md mb-6">
              <h4 className="font-semibold text-blue-900 mb-2">Media Mix Modeling Included</h4>
              <p className="text-sm text-blue-800">
                Our advanced MMM helps optimize your marketing mix by analyzing the impact of different channels,
                identifying synergies, and providing data-driven recommendations for budget allocation.
                Companies typically see up to 20% improvement in ROAS after implementing our insights.
              </p>
            </div>

            <Link
              to="/contact"
              className="block w-full text-center bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
            >
              Contact Sales
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function Feature({ available, text }: { available: boolean; text: string }) {
  return (
    <div className="flex items-center space-x-3">
      {available ? (
        <Check className="h-5 w-5 text-green-500" />
      ) : (
        <X className="h-5 w-5 text-red-500" />
      )}
      <span className={available ? 'text-gray-900' : 'text-gray-400'}>{text}</span>
    </div>
  );
}