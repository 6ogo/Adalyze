import React from 'react';
import { ResponsiveContainer, ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

interface ROIChartProps {
  data: Array<{
    name: string;
    spend: number;
    revenue: number;
    roi: number;
  }>;
}

export function ROIChart({ data }: ROIChartProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <ComposedChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis yAxisId="left" />
        <YAxis yAxisId="right" orientation="right" />
        <Tooltip />
        <Legend />
        <Bar yAxisId="left" dataKey="spend" fill="#8884d8" name="Spend" />
        <Bar yAxisId="left" dataKey="revenue" fill="#82ca9d" name="Revenue" />
        <Line yAxisId="right" type="monotone" dataKey="roi" stroke="#ff7300" name="ROI %" />
      </ComposedChart>
    </ResponsiveContainer>
  );
}