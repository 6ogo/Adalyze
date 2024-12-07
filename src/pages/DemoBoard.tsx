import React, { useState, useMemo } from 'react';
import { DashboardSidebar } from '../components/DashboardSidebar';
import { HeatmapChart } from '../components/charts/HeatmapChart';
import { PieChart } from '../components/charts/PieChart';
import { FunnelChart } from '../components/charts/FunnelChart';
import { ROIChart } from '../components/charts/ROIChart';
import { SeasonalityChart } from '../components/charts/SeasonalityChart';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import rawDemoData, { generateFunnelData, generateROIData, generateSeasonalityData } from '../data/demoData';
import { ChartSettings } from '../components/charts/ChartSettings';
import { DEFAULT_CHART_SETTINGS } from '../utils/chartUtils';

const COLORS = ['#1877F2', '#E4405F', '#0A66C2', '#000000'];

export function DemoBoard() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeCharts, setActiveCharts] = useState(['timeline', 'distribution', 'heatmap', 'funnel', 'roi', 'seasonality', 'campaigns']);
  const [dateRange, setDateRange] = useState('6m');
  const [platform, setPlatform] = useState('all');
  const [metric, setMetric] = useState('spend');
  const [ageRange, setAgeRange] = useState('all');
  const [gender, setGender] = useState('all');
  const [chartSettings, setChartSettings] = useState(DEFAULT_CHART_SETTINGS);

  // Filter data based on date range
  const dateFilteredData = useMemo(() => {
    const months = {
      '1m': 1,
      '3m': 3,
      '6m': 6,
      '1y': 12
    }[dateRange];
    
    return rawDemoData.slice(-months);
  }, [dateRange]);

  // Apply all other filters
  const filteredData = useMemo(() => {
    return dateFilteredData.map(month => {
      const filteredMonth: any = { name: month.name };
      
      const platforms = platform === 'all' 
        ? ['facebook', 'instagram', 'linkedin', 'tiktok']
        : [platform];
      
      platforms.forEach(p => {
        const platformData = month[p];
        if (ageRange === 'all') {
          filteredMonth[p] = platformData[metric];
        } else {
          filteredMonth[p] = platformData.ageGroups[ageRange][metric];
        }
      });

      return filteredMonth;
    });
  }, [dateFilteredData, platform, metric, ageRange]);

  // Get campaign data
  const campaignData = useMemo(() => {
    const lastMonth = dateFilteredData[dateFilteredData.length - 1];
    if (!lastMonth) return [];

    const platforms = platform === 'all' 
      ? ['facebook', 'instagram', 'linkedin', 'tiktok']
      : [platform];

    return platforms.flatMap(p => 
      lastMonth[p].campaigns.map((campaign: any) => ({
        ...campaign,
        platform: p
      }))
    );
  }, [dateFilteredData, platform]);

  const handleFilterChange = (filterType: string, value: string) => {
    switch (filterType) {
      case 'dateRange':
        setDateRange(value);
        break;
      case 'platform':
        setPlatform(value);
        break;
      case 'metric':
        setMetric(value);
        break;
      case 'ageRange':
        setAgeRange(value);
        break;
      case 'gender':
        setGender(value);
        break;
    }
  };

  const handleChartSettingsChange = (chartId: string, newSettings: any) => {
    setChartSettings(prev => ({
      ...prev,
      [chartId]: newSettings
    }));
  };

  // Calculate totals for metric cards
  const totals = useMemo(() => {
    const lastMonth = dateFilteredData[dateFilteredData.length - 1];
    if (!lastMonth) return { spend: 0, clicks: 0, impressions: 0, videoViews: 0, engagement: 0 };

    const platforms = platform === 'all' 
      ? ['facebook', 'instagram', 'linkedin', 'tiktok']
      : [platform];

    return platforms.reduce((acc, p) => {
      const platformData = ageRange === 'all' 
        ? lastMonth[p]
        : lastMonth[p].ageGroups[ageRange];

      acc.spend += platformData.spend;
      acc.clicks += platformData.clicks;
      acc.impressions += platformData.impressions;
      acc.videoViews += platformData.videoViews;
      acc.engagement += platformData.engagement;
      return acc;
    }, { spend: 0, clicks: 0, impressions: 0, videoViews: 0, engagement: 0 });
  }, [dateFilteredData, platform, ageRange]);

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardSidebar
        activeCharts={activeCharts}
        onToggleChart={(chartId) => {
          setActiveCharts(prev => 
            prev.includes(chartId) 
              ? prev.filter(id => id !== chartId)
              : [...prev, chartId]
          );
        }}
        isCollapsed={isCollapsed}
        onToggleCollapse={() => setIsCollapsed(prev => !prev)}
        dateRange={dateRange}
        platform={platform}
        metric={metric}
        ageRange={ageRange}
        gender={gender}
        onFilterChange={handleFilterChange}
      />

      <div className={`transition-all duration-300 ${isCollapsed ? 'ml-16' : 'ml-64'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Demo notice banner */}
          <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-8">
            <div className="flex">
              <div className="ml-3">
                <p className="text-sm text-blue-700">
                  This is a demo dashboard. Sign up to access your personalized analytics dashboard.
                </p>
              </div>
            </div>
          </div>

          {/* Metric Cards */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
            <MetricCard
              title="Total Spend"
              value={`$${totals.spend.toLocaleString()}`}
              change="+12.3%"
            />
            <MetricCard
              title="Total Clicks"
              value={totals.clicks.toLocaleString()}
              change="+8.1%"
            />
            <MetricCard
              title="Total Impressions"
              value={totals.impressions.toLocaleString()}
              change="+15.4%"
            />
            <MetricCard
              title="Video Views"
              value={totals.videoViews.toLocaleString()}
              change="+10.2%"
            />
            <MetricCard
              title="Engagement"
              value={totals.engagement.toLocaleString()}
              change="+7.8%"
            />
          </div>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {activeCharts.includes('timeline') && (
              <div className="bg-white p-6 rounded-lg shadow-lg relative">
                <h2 className="text-xl font-semibold mb-4">Performance Timeline</h2>
                <ChartSettings
                  chartId="timeline"
                  settings={chartSettings.timeline}
                  onSettingsChange={handleChartSettingsChange}
                />
                <div className="h-80">
                  <ResponsiveContainer>
                    <LineChart data={filteredData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      {platform === 'all' ? (
                        <>
                          <Line type="monotone" dataKey="facebook" stroke="#1877F2" />
                          <Line type="monotone" dataKey="instagram" stroke="#E4405F" />
                          <Line type="monotone" dataKey="linkedin" stroke="#0A66C2" />
                          <Line type="monotone" dataKey="tiktok" stroke="#000000" />
                        </>
                      ) : (
                        <Line type="monotone" dataKey={platform} stroke="#1877F2" />
                      )}
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}

            {activeCharts.includes('distribution') && (
              <div className="bg-white p-6 rounded-lg shadow-lg relative">
                <h2 className="text-xl font-semibold mb-4">Platform Distribution</h2>
                <ChartSettings
                  chartId="distribution"
                  settings={chartSettings.distribution}
                  onSettingsChange={handleChartSettingsChange}
                />
                <div className="h-80">
                  <PieChart 
                    data={Object.entries(totals).map(([key, value]) => ({
                      name: key,
                      value
                    }))} 
                    colors={COLORS} 
                  />
                </div>
              </div>
            )}

            {activeCharts.includes('heatmap') && (
              <div className="bg-white p-6 rounded-lg shadow-lg relative">
                <h2 className="text-xl font-semibold mb-4">
                  {`${metric.charAt(0).toUpperCase() + metric.slice(1)} by Age Group and Platform`}
                </h2>
                <ChartSettings
                  chartId="heatmap"
                  settings={chartSettings.heatmap}
                  onSettingsChange={handleChartSettingsChange}
                />
                <div className="h-80">
                  <HeatmapChart 
                    data={dateFilteredData}
                    width={500}
                    height={300}
                    metric={metric}
                  />
                </div>
              </div>
            )}

            {activeCharts.includes('seasonality') && (
              <div className="bg-white p-6 rounded-lg shadow-lg relative">
                <h2 className="text-xl font-semibold mb-4">Seasonality Analysis</h2>
                <ChartSettings
                  chartId="seasonality"
                  settings={chartSettings.seasonality}
                  onSettingsChange={handleChartSettingsChange}
                />
                <div className="h-80">
                  <SeasonalityChart 
                    data={generateSeasonalityData(dateFilteredData)}
                    metric={metric}
                  />
                </div>
              </div>
            )}

            {activeCharts.includes('funnel') && (
              <div className="bg-white p-6 rounded-lg shadow-lg relative">
                <h2 className="text-xl font-semibold mb-4">Conversion Funnel</h2>
                <div className="h-80">
                  <FunnelChart 
                    data={generateFunnelData(dateFilteredData)}
                    colors={COLORS}
                  />
                </div>
              </div>
            )}

            {activeCharts.includes('roi') && (
              <div className="bg-white p-6 rounded-lg shadow-lg relative">
                <h2 className="text-xl font-semibold mb-4">ROI Analysis</h2>
                <div className="h-80">
                  <ROIChart data={generateROIData(dateFilteredData)} />
                </div>
              </div>
            )}
          </div>

          {/* Campaigns Section */}
          {activeCharts.includes('campaigns') && (
            <div className="mt-8">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-xl font-semibold mb-4">Active Campaigns</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {campaignData.map((campaign: any, index: number) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium">{campaign.name}</h3>
                        <span className="text-sm text-gray-500 capitalize">{campaign.platform}</span>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Spend:</span>
                          <span className="font-medium">${campaign.spend.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Clicks:</span>
                          <span className="font-medium">{campaign.clicks.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Impressions:</span>
                          <span className="font-medium">{campaign.impressions.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Conversions:</span>
                          <span className="font-medium">{campaign.conversions.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function MetricCard({ title, value, change }: { title: string; value: string; change: string }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-semibold text-gray-900">{value}</p>
        </div>
      </div>
      <p className="mt-2 text-sm text-green-600">{change}</p>
    </div>
  );
}