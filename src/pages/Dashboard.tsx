import React, { useState, useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import rawDemoData from '../data/demoData';

export function Dashboard() {
  const [dateRange, setDateRange] = useState('6m');
  const [platform, setPlatform] = useState('all');
  const [metric, setMetric] = useState('spend');
  const [ageRange, setAgeRange] = useState('all');
  const [gender, setGender] = useState('all');
  const [location, setLocation] = useState('all');

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
      
      // Filter platforms
      const platforms = platform === 'all' 
        ? ['facebook', 'instagram', 'linkedin', 'tiktok']
        : [platform];
      
      platforms.forEach(p => {
        filteredMonth[p] = month[p][metric];
      });

      return filteredMonth;
    });
  }, [dateFilteredData, platform, metric]);

  // Calculate totals for metric cards
  const totals = useMemo(() => {
    const platformData = platform === 'all' ? 
      ['facebook', 'instagram', 'linkedin', 'tiktok'] : 
      [platform];

    const lastMonth = dateFilteredData[dateFilteredData.length - 1];
    
    return {
      clicks: platformData.reduce((sum, p) => 
        sum + lastMonth[p].clicks, 0),
      reach: platformData.reduce((sum, p) => 
        sum + lastMonth[p].impressions, 0),
      views: platformData.reduce((sum, p) => 
        sum + lastMonth[p].videoViews, 0),
      engagement: platformData.reduce((sum, p) => 
        sum + lastMonth[p].engagement, 0),
    };
  }, [dateFilteredData, platform]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header and Filters */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Marketing Dashboard</h1>
        </div>

        {/* Filters */}
        <div className="bg-white p-4 rounded-lg shadow-sm mb-8 grid grid-cols-2 md:grid-cols-6 gap-4">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="1m">Last month</option>
            <option value="3m">Last 3 months</option>
            <option value="6m">Last 6 months</option>
            <option value="1y">Last year</option>
          </select>

          <select
            value={platform}
            onChange={(e) => setPlatform(e.target.value)}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="all">All Platforms</option>
            <option value="facebook">Facebook</option>
            <option value="instagram">Instagram</option>
            <option value="linkedin">LinkedIn</option>
            <option value="tiktok">TikTok</option>
          </select>

          <select
            value={metric}
            onChange={(e) => setMetric(e.target.value)}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="spend">Ad Spend</option>
            <option value="clicks">Clicks</option>
            <option value="impressions">Impressions</option>
            <option value="videoViews">Video Views</option>
            <option value="engagement">Engagement</option>
          </select>
        </div>

        {/* Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <MetricCard
            title="Total Clicks"
            value={`${(totals.clicks).toLocaleString()}`}
            change="+12.3%"
          />
          <MetricCard
            title="Total Reach"
            value={`${(totals.reach).toLocaleString()}`}
            change="+8.1%"
          />
          <MetricCard
            title="Video Views"
            value={`${(totals.views).toLocaleString()}`}
            change="+15.4%"
          />
          <MetricCard
            title="Engagement Rate"
            value={`${((totals.engagement / totals.reach) * 100).toFixed(1)}%`}
            change="+2.2%"
          />
        </div>

        {/* Charts */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Performance Over Time</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
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