import React from 'react';
import { BookOpen, Key, Link as LinkIcon, BarChart, TrendingUp, Target, DollarSign, Users, Eye, MousePointer, Heart, Clock, Map, Filter } from 'lucide-react';

export function Docs() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Documentation</h1>
          <p className="text-xl text-gray-600">
            Master your marketing analytics with Adalyze
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <QuickStartCard
            icon={<Key className="h-6 w-6 text-blue-600" />}
            title="Getting Started"
            description="Learn how to set up your account and connect your marketing platforms"
          />
          <QuickStartCard
            icon={<BarChart className="h-6 w-6 text-blue-600" />}
            title="Understanding Metrics"
            description="Deep dive into all available metrics and their significance"
          />
          <QuickStartCard
            icon={<Filter className="h-6 w-6 text-blue-600" />}
            title="Using Filters"
            description="Learn how to use filters to analyze specific data segments"
          />
        </div>

        <div className="space-y-12">
          {/* Getting Started Section */}
          <DocSection
            icon={<Key className="h-8 w-8 text-blue-600" />}
            title="Getting Started"
            content={
              <>
                <p className="text-gray-600 mb-4">
                  Follow these steps to start using Adalyze:
                </p>
                <ol className="list-decimal list-inside space-y-2 text-gray-600">
                  <li>Create an account using email or OAuth providers</li>
                  <li>Verify your email and set up 2FA for enhanced security</li>
                  <li>Connect your marketing platforms (Google Ads, Meta, etc.)</li>
                  <li>Grant necessary permissions for data access</li>
                  <li>Access your unified dashboard</li>
                </ol>
              </>
            }
          />

          {/* Understanding Metrics Section */}
          <DocSection
            icon={<BarChart className="h-8 w-8 text-blue-600" />}
            title="Understanding Metrics"
            content={
              <div className="space-y-6">
                <MetricExplanation
                  icon={<Eye className="h-6 w-6 text-blue-600" />}
                  title="Impressions"
                  description="The number of times your ad was displayed. This metric helps understand your ad's visibility and reach."
                  interpretation="Higher impressions indicate broader reach, but should be analyzed alongside engagement metrics."
                />
                
                <MetricExplanation
                  icon={<MousePointer className="h-6 w-6 text-blue-600" />}
                  title="Clicks"
                  description="The number of times users clicked on your ad. A direct measure of user interest."
                  interpretation="Higher clicks suggest engaging ad content. Compare with impressions to calculate CTR."
                />
                
                <MetricExplanation
                  icon={<Heart className="h-6 w-6 text-blue-600" />}
                  title="Engagement Rate"
                  description="The percentage of users who interacted with your ad (likes, comments, shares)."
                  interpretation="Higher engagement rates indicate resonating content. Benchmark against industry standards."
                />
                
                <MetricExplanation
                  icon={<Clock className="h-6 w-6 text-blue-600" />}
                  title="Video Views"
                  description="The number of times your video ads were watched. Includes various duration thresholds."
                  interpretation="Analyze view duration patterns to optimize video length and content."
                />
                
                <MetricExplanation
                  icon={<DollarSign className="h-6 w-6 text-blue-600" />}
                  title="Cost Metrics"
                  description="Various cost-related metrics including CPC (Cost per Click), CPM (Cost per Mille), and ROAS (Return on Ad Spend)."
                  interpretation="Use these metrics to optimize budget allocation and measure campaign efficiency."
                />
              </div>
            }
          />

          {/* Using Filters Section */}
          <DocSection
            icon={<Filter className="h-8 w-8 text-blue-600" />}
            title="Using Filters"
            content={
              <div className="space-y-4">
                <FilterExplanation
                  title="Date Range"
                  description="Filter data by specific time periods to analyze trends and seasonality."
                  options={['Last month', 'Last 3 months', 'Last 6 months', 'Last year', 'Custom range']}
                />
                
                <FilterExplanation
                  title="Platforms"
                  description="Analyze data from specific marketing platforms or compare across platforms."
                  options={['Facebook', 'Instagram', 'LinkedIn', 'TikTok', 'All Platforms']}
                />
                
                <FilterExplanation
                  title="Demographics"
                  description="Filter by age groups and gender to understand audience segments."
                  options={['Age ranges', 'Gender', 'Location']}
                />
                
                <FilterExplanation
                  title="Metrics"
                  description="Choose specific metrics to focus your analysis."
                  options={['Spend', 'Clicks', 'Impressions', 'Video Views', 'Engagement']}
                />
              </div>
            }
          />
        </div>
      </div>
    </div>
  );
}

function QuickStartCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <div className="flex items-center space-x-3 mb-4">
        {icon}
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      </div>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

function DocSection({ icon, title, content }: { icon: React.ReactNode; title: string; content: React.ReactNode }) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <div className="flex items-center space-x-3 mb-6">
        {icon}
        <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
      </div>
      {content}
    </div>
  );
}

function MetricExplanation({ icon, title, description, interpretation }: { 
  icon: React.ReactNode; 
  title: string; 
  description: string;
  interpretation: string;
}) {
  return (
    <div className="border-b border-gray-200 pb-4">
      <div className="flex items-center space-x-3 mb-2">
        {icon}
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      </div>
      <p className="text-gray-600 mb-2">{description}</p>
      <p className="text-sm text-blue-600">
        <strong>How to interpret:</strong> {interpretation}
      </p>
    </div>
  );
}

function FilterExplanation({ title, description, options }: { 
  title: string; 
  description: string;
  options: string[];
}) {
  return (
    <div className="border-b border-gray-200 pb-4">
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 mb-2">{description}</p>
      <div className="flex flex-wrap gap-2">
        {options.map((option, index) => (
          <span key={index} className="px-2 py-1 bg-blue-50 text-blue-600 rounded-md text-sm">
            {option}
          </span>
        ))}
      </div>
    </div>
  );
}