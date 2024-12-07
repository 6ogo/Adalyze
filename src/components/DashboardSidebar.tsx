import React from 'react';
import { ChevronLeft, ChevronRight, LineChart, PieChart, BarChart, Grid, Filter, DollarSign, TrendingUp } from 'lucide-react';
import { AVAILABLE_METRICS } from '../utils/chartUtils';

interface DashboardSidebarProps {
  activeCharts: string[];
  onToggleChart: (chartId: string) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  dateRange: string;
  platform: string;
  metric: string;
  ageRange: string;
  gender: string;
  onFilterChange: (filterType: string, value: string) => void;
}

export function DashboardSidebar({
  activeCharts,
  onToggleChart,
  isCollapsed,
  onToggleCollapse,
  dateRange,
  platform,
  metric,
  ageRange,
  gender,
  onFilterChange
}: DashboardSidebarProps) {
  const availableCharts = [
    {
      id: 'timeline',
      name: 'Performance Timeline',
      icon: <LineChart className="h-5 w-5" />,
      description: 'Track metrics over time'
    },
    {
      id: 'distribution',
      name: 'Platform Distribution',
      icon: <PieChart className="h-5 w-5" />,
      description: 'Compare platform performance'
    },
    {
      id: 'heatmap',
      name: 'Performance Heatmap',
      icon: <Grid className="h-5 w-5" />,
      description: 'Detailed performance analysis'
    },
    {
      id: 'seasonality',
      name: 'Seasonality Analysis',
      icon: <TrendingUp className="h-5 w-5" />,
      description: 'Track seasonal performance patterns'
    },
    {
      id: 'funnel',
      name: 'Conversion Funnel',
      icon: <Filter className="h-5 w-5" />,
      description: 'Track user journey and conversions'
    },
    {
      id: 'roi',
      name: 'ROI Analysis',
      icon: <DollarSign className="h-5 w-5" />,
      description: 'Return on investment metrics'
    },
    {
      id: 'campaigns',
      name: 'Campaign Overview',
      icon: <BarChart className="h-5 w-5" />,
      description: 'Active campaign performance'
    }
  ];

  return (
    <div 
      className={`fixed left-0 top-0 h-screen bg-white border-r transform transition-all duration-300 ${
        isCollapsed ? 'w-16' : 'w-64'
      } z-50`}
    >
      <div className="p-4 border-b flex justify-between items-center">
        <h2 className={`font-semibold ${isCollapsed ? 'hidden' : 'block'}`}>
          Customize Report
        </h2>
        <button
          onClick={onToggleCollapse}
          className="p-1 hover:bg-gray-100 rounded-full"
        >
          {isCollapsed ? (
            <ChevronRight className="h-5 w-5" />
          ) : (
            <ChevronLeft className="h-5 w-5" />
          )}
        </button>
      </div>

      <div className="p-4 space-y-6 overflow-y-auto h-[calc(100vh-64px)]">
        {!isCollapsed && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date Range
              </label>
              <select
                value={dateRange}
                onChange={(e) => onFilterChange('dateRange', e.target.value)}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="1m">Last month</option>
                <option value="3m">Last 3 months</option>
                <option value="6m">Last 6 months</option>
                <option value="1y">Last year</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Platform
              </label>
              <select
                value={platform}
                onChange={(e) => onFilterChange('platform', e.target.value)}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="all">All Platforms</option>
                <option value="facebook">Facebook</option>
                <option value="instagram">Instagram</option>
                <option value="linkedin">LinkedIn</option>
                <option value="tiktok">TikTok</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Metric
              </label>
              <select
                value={metric}
                onChange={(e) => onFilterChange('metric', e.target.value)}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                {AVAILABLE_METRICS.map((m) => (
                  <option key={m.value} value={m.value}>
                    {m.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Age Range
              </label>
              <select
                value={ageRange}
                onChange={(e) => onFilterChange('ageRange', e.target.value)}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="all">All Ages</option>
                <option value="18-24">18-24</option>
                <option value="25-34">25-34</option>
                <option value="35-44">35-44</option>
                <option value="45-54">45-54</option>
                <option value="55+">55+</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Gender
              </label>
              <select
                value={gender}
                onChange={(e) => onFilterChange('gender', e.target.value)}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="all">All Genders</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
        )}

        <div className="border-t pt-4">
          <h3 className={`font-medium mb-2 ${isCollapsed ? 'hidden' : 'block'}`}>
            Available Charts
          </h3>
          <div className="space-y-2">
            {availableCharts.map((chart) => (
              <button
                key={chart.id}
                onClick={() => onToggleChart(chart.id)}
                className={`w-full flex items-center space-x-3 p-2 rounded-md transition-colors ${
                  activeCharts.includes(chart.id)
                    ? 'bg-blue-50 text-blue-600'
                    : 'hover:bg-gray-50'
                } ${isCollapsed ? 'justify-center' : ''}`}
              >
                {chart.icon}
                {!isCollapsed && (
                  <div className="flex-1 text-left">
                    <div className="font-medium">{chart.name}</div>
                    <div className="text-xs text-gray-500">{chart.description}</div>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}