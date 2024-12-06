import React from 'react';
import { BarChart3, Users, Shield, Globe } from 'lucide-react';

export function About() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">About Adalyze</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're revolutionizing marketing analytics by providing unified insights across all your marketing channels
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <ValueCard
            icon={<BarChart3 className="h-8 w-8 text-blue-600" />}
            title="Data-Driven"
            description="We believe in making decisions based on comprehensive data analysis"
          />
          <ValueCard
            icon={<Users className="h-8 w-8 text-blue-600" />}
            title="Customer First"
            description="Your success is our priority - we're here to help you grow"
          />
          <ValueCard
            icon={<Shield className="h-8 w-8 text-blue-600" />}
            title="Security"
            description="Enterprise-grade security to protect your valuable data"
          />
          <ValueCard
            icon={<Globe className="h-8 w-8 text-blue-600" />}
            title="Global Reach"
            description="Supporting businesses worldwide with local expertise"
          />
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="text-lg text-gray-700 leading-relaxed">
              <p className="mb-6">
                Adalyze was founded with a simple mission: to help businesses make better marketing decisions through data. 
                We understand the challenges of managing multiple marketing channels and making sense of vast amounts of data.
              </p>
              <p className="mb-6">
                Our platform brings together data from all your marketing channels into one unified dashboard, providing 
                clear insights and actionable recommendations. We use advanced analytics and machine learning to help you 
                optimize your marketing spend and improve ROI.
              </p>
              <p>
                Based in Stockholm, Sweden, we serve clients globally, helping them transform their marketing operations 
                through data-driven decision making.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ValueCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg text-center">
      <div className="inline-flex items-center justify-center p-3 bg-blue-50 rounded-lg mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}