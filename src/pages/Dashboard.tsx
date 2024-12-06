import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

const mockData = [
  { name: 'Jan', facebook: 4000, instagram: 2400, linkedin: 2400, tiktok: 1800 },
  { name: 'Feb', facebook: 3000, instagram: 1398, linkedin: 2210, tiktok: 2800 },
  { name: 'Mar', facebook: 2000, instagram: 9800, linkedin: 2290, tiktok: 3800 },
  { name: 'Apr', facebook: 2780, instagram: 3908, linkedin: 2000, tiktok: 4300 },
  { name: 'May', facebook: 1890, instagram: 4800, linkedin: 2181, tiktok: 3800 },
  { name: 'Jun', facebook: 2390, instagram: 3800, linkedin: 2500, tiktok: 4300 },
];

export function Dashboard() {
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Marketing Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <StatCard
            title="Facebook Ads"
            value="$12,345"
            change="+12.3%"
            icon={<Facebook className="h-6 w-6 text-blue-600" />}
          />
          <StatCard
            title="Instagram Ads"
            value="$8,765"
            change="+8.1%"
            icon={<Instagram className="h-6 w-6 text-pink-600" />}
          />
          <StatCard
            title="LinkedIn Ads"
            value="$6,543"
            change="+5.4%"
            icon={<Linkedin className="h-6 w-6 text-blue-800" />}
          />
          <StatCard
            title="Twitter Ads"
            value="$4,321"
            change="+3.2%"
            icon={<Twitter className="h-6 w-6 text-blue-400" />}
          />
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
          <h2 className="text-xl font-semibold mb-4">Performance Overview</h2>
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="facebook" stroke="#1877F2" />
                <Line type="monotone" dataKey="instagram" stroke="#E4405F" />
                <Line type="monotone" dataKey="linkedin" stroke="#0A66C2" />
                <Line type="monotone" dataKey="tiktok" stroke="#000000" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Platform Integration Status</h2>
            <div className="space-y-4">
              <PlatformStatus name="Google Ads" status="Connected" />
              <PlatformStatus name="Meta Ads" status="Connected" />
              <PlatformStatus name="TikTok Ads" status="Not Connected" />
              <PlatformStatus name="LinkedIn Ads" status="Connected" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Recent Activities</h2>
            <div className="space-y-4">
              <Activity
                message="Campaign 'Summer Sale' started"
                timestamp="2 hours ago"
                platform="Facebook"
              />
              <Activity
                message="Budget updated for 'Product Launch'"
                timestamp="5 hours ago"
                platform="Instagram"
              />
              <Activity
                message="New ad set created"
                timestamp="1 day ago"
                platform="LinkedIn"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, change, icon }: { title: string; value: string; change: string; icon: React.ReactNode }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-semibold text-gray-900">{value}</p>
        </div>
        {icon}
      </div>
      <p className="mt-2 text-sm text-green-600">{change}</p>
    </div>
  );
}

function PlatformStatus({ name, status }: { name: string; status: string }) {
  const isConnected = status === 'Connected';
  return (
    <div className="flex items-center justify-between">
      <span className="font-medium">{name}</span>
      <span className={`px-2 py-1 rounded-full text-sm ${
        isConnected ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
      }`}>
        {status}
      </span>
    </div>
  );
}

function Activity({ message, timestamp, platform }: { message: string; timestamp: string; platform: string }) {
  return (
    <div className="flex items-center space-x-3">
      <div className="flex-1">
        <p className="text-sm font-medium text-gray-900">{message}</p>
        <p className="text-sm text-gray-500">{platform} • {timestamp}</p>
      </div>
    </div>
  );
}