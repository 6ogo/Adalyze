import React from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

interface SeasonalityChartProps {
  data: any[];
  metric: string;
}

const PLATFORM_COLORS = {
  facebook: '#1877F2',
  instagram: '#E4405F',
  linkedin: '#0A66C2',
  tiktok: '#000000'
};

export function SeasonalityChart({ data, metric }: SeasonalityChartProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        {Object.entries(PLATFORM_COLORS).map(([platform, color]) => (
          <Line
            key={platform}
            type="monotone"
            dataKey={`${platform}_${metric}`}
            stroke={color}
            name={`${platform.charAt(0).toUpperCase() + platform.slice(1)}`}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
}