import React from 'react';
import { ResponsiveContainer, FunnelChart as RechartsChart, Funnel, Cell, Tooltip, LabelList } from 'recharts';

interface FunnelChartProps {
  data: Array<{
    name: string;
    value: number;
  }>;
  colors: string[];
}

export function FunnelChart({ data, colors }: FunnelChartProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RechartsChart>
        <Tooltip />
        <Funnel
          data={data}
          dataKey="value"
          nameKey="name"
          fill="#8884d8"
        >
          <LabelList position="right" fill="#000" stroke="none" dataKey="name" />
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Funnel>
      </RechartsChart>
    </ResponsiveContainer>
  );
}