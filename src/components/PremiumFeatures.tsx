import React from 'react';
import { useNavigate } from 'react-router-dom';
import { DollarSign, Clock, LineChart, MessageSquare } from 'lucide-react';

type BenefitProps = {
  title: string;
  items: string[];
  icon: React.ReactNode;
};

function Benefit({ title, items, icon }: BenefitProps) {
  return (
    <div className="bg-white rounded-lg p-6 shadow-lg">
      <div className="flex items-center space-x-3 mb-4">
        <div className="p-2 bg-blue-50 rounded-lg">
          {icon}
        </div>
        <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
      </div>
      <ul className="space-y-2">
        {items.map((item, index) => (
          <li key={index} className="flex items-start space-x-2">
            <span className="text-blue-600 mt-1">•</span>
            <span className="text-gray-600">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function PremiumFeatures() {
  const navigate = useNavigate();

  return (
    <div className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Premium Analytics Subscription
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Transform your marketing from guesswork to data-driven decisions with our Media Mix Modelling
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Benefit
            icon={<LineChart className="h-6 w-6 text-blue-600" />}
            title="Channel Effectiveness Insights"
            items={[
              "Optimal spending amount per channel",
              "Best timing for spending adjustments",
              "Channel interaction and synergy effects",
              "Channel-to-goal alignment and effectiveness"
            ]}
          />

          <Benefit
            icon={<DollarSign className="h-6 w-6 text-blue-600" />}
            title="Clear ROI Measurements"
            items={[
              "Per-channel return on every dollar spent",
              "Diminishing returns thresholds",
              "Underperforming channel identification",
              "Scaling opportunities in high-performing channels"
            ]}
          />

          <Benefit
            icon={<Clock className="h-6 w-6 text-blue-600" />}
            title="Timing Optimization"
            items={[
              "Channel-specific seasonal effectiveness",
              "Campaign timing optimization",
              "Marketing effect duration measurement",
              "Dynamic spend adjustment recommendations"
            ]}
          />
        </div>

        <div className="mt-12 text-center">
          <button 
            onClick={() => navigate('/contact')}
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
          >
            <MessageSquare className="h-5 w-5 mr-2" />
            Contact Us
          </button>
        </div>
      </div>
    </div>
  );
}