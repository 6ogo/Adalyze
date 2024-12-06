import React from 'react';
import { useNavigate } from 'react-router-dom';
import { TrendingUp, PieChart, Target, BarChart4 } from 'lucide-react';
import { PremiumFeatures } from './PremiumFeatures';

export function Hero() {
  const navigate = useNavigate();

  return (
    <div className="bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            <span className="block">Unified Marketing Analytics</span>
            <span className="block text-blue-600">All Your Data in One Place</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Connect all your marketing platforms and get real-time insights. Make data-driven decisions with our comprehensive analytics dashboard.
          </p>
          <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
            <div className="rounded-md shadow">
              <button
                onClick={() => navigate('/dashboard')}
                className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10"
              >
                Go to Dashboard
              </button>
            </div>
          </div>
        </div>

        <div className="mt-20">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <Feature
              icon={<TrendingUp className="h-6 w-6 text-blue-600" />}
              title="Performance Tracking"
              description="Monitor all your marketing campaigns in real-time"
            />
            <Feature
              icon={<PieChart className="h-6 w-6 text-blue-600" />}
              title="Data Visualization"
              description="Beautiful charts and graphs for better insights"
            />
            <Feature
              icon={<Target className="h-6 w-6 text-blue-600" />}
              title="Campaign Analysis"
              description="Track ROI and optimize your marketing spend"
            />
            <Feature
              icon={<BarChart4 className="h-6 w-6 text-blue-600" />}
              title="Cross-Platform Analytics"
              description="Connect multiple ad platforms in one dashboard"
            />
          </div>
        </div>
      </div>

      <PremiumFeatures />
    </div>
  );
}

function Feature({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="pt-6">
      <div className="flow-root bg-white rounded-lg px-6 pb-8">
        <div className="-mt-6">
          <div className="inline-flex items-center justify-center p-3 bg-blue-50 rounded-md shadow-lg">
            {icon}
          </div>
          <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">{title}</h3>
          <p className="mt-5 text-base text-gray-500">{description}</p>
        </div>
      </div>
    </div>
  );
}