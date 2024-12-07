import React from 'react';
import { ResponsiveContainer, PieChart as RechartsChart, Pie, Cell, Tooltip, Legend } from 'recharts';

interface PieChartProps {
  data: Array<{
    name: string;
    value: number;
  }>;
  colors: string[];
}

export function PieChart({ data, colors }: PieChartProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RechartsChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </RechartsChart>
    </ResponsiveContainer>
  );
}