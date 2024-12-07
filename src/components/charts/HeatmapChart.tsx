import React, { useMemo } from 'react';
import { Group } from '@visx/group';
import { scaleLinear } from '@visx/scale';
import { HeatmapRect } from '@visx/heatmap';
import { withTooltip, Tooltip } from '@visx/tooltip';
import { formatMetricValue } from '../../utils/chartUtils';

const AGE_GROUPS = ['18-24', '25-34', '35-44', '45-54', '55+'];
const PLATFORMS = ['facebook', 'instagram', 'linkedin', 'tiktok'];

interface HeatmapProps {
  data: any[];
  width: number;
  height: number;
  metric: string;
}

function BaseHeatmapChart({ 
  data,
  width,
  height,
  metric,
  tooltipOpen,
  tooltipData,
  tooltipLeft,
  tooltipTop,
  showTooltip,
  hideTooltip
}: HeatmapProps & any) {
  // Calculate dimensions
  const margin = { top: 40, right: 30, bottom: 50, left: 70 };
  const xMax = width - margin.left - margin.right;
  const yMax = height - margin.top - margin.bottom;

  // Calculate cell sizes
  const binWidth = xMax / PLATFORMS.length;
  const binHeight = yMax / AGE_GROUPS.length;

  // Transform data for heatmap
  const heatmapData = useMemo(() => {
    const lastMonth = data[data.length - 1];
    if (!lastMonth) return [];

    const values = AGE_GROUPS.flatMap(age =>
      PLATFORMS.map(platform => lastMonth[platform].ageGroups[age][metric])
    );

    const maxValue = Math.max(...values);
    const minValue = Math.min(...values);

    return AGE_GROUPS.map((age, i) => ({
      bin: i,
      bins: PLATFORMS.map((platform, j) => ({
        bin: j,
        count: lastMonth[platform].ageGroups[age][metric],
        percentage: ((lastMonth[platform].ageGroups[age][metric] - minValue) / (maxValue - minValue)) * 100
      }))
    }));
  }, [data, metric]);

  // Calculate color scale
  const colorScale = scaleLinear<string>({
    domain: [0, 100],
    range: ['#f3f4f6', '#1d4ed8']
  });

  return (
    <div style={{ position: 'relative', width, height }}>
      <svg width={width} height={height}>
        <Group top={margin.top} left={margin.left}>
          {/* Y-axis labels */}
          {AGE_GROUPS.map((age, i) => (
            <text
              key={age}
              x={-10}
              y={i * binHeight + binHeight / 2}
              dy=".32em"
              textAnchor="end"
              fontSize={12}
            >
              {age}
            </text>
          ))}

          {/* X-axis labels */}
          {PLATFORMS.map((platform, i) => (
            <text
              key={platform}
              x={i * binWidth + binWidth / 2}
              y={yMax + 20}
              textAnchor="middle"
              fontSize={12}
            >
              {platform.charAt(0).toUpperCase() + platform.slice(1)}
            </text>
          ))}

          {/* Heatmap cells */}
          {heatmapData.map((row, i) => 
            row.bins.map((bin, j) => (
              <rect
                key={`${i}-${j}`}
                x={j * binWidth}
                y={i * binHeight}
                width={binWidth - 1}
                height={binHeight - 1}
                fill={colorScale(bin.percentage)}
                onMouseEnter={() => {
                  const tooltipData = {
                    age: AGE_GROUPS[i],
                    platform: PLATFORMS[j],
                    value: bin.count,
                    metric
                  };
                  showTooltip({
                    tooltipData,
                    tooltipLeft: margin.left + j * binWidth,
                    tooltipTop: margin.top + i * binHeight
                  });
                }}
                onMouseLeave={hideTooltip}
              />
            ))
          )}
        </Group>
      </svg>

      {tooltipOpen && tooltipData && (
        <Tooltip
          top={tooltipTop}
          left={tooltipLeft}
          style={{
            backgroundColor: 'white',
            padding: '8px',
            borderRadius: '4px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
            color: '#000'
          }}
        >
          <div className="text-sm">
            <div className="font-medium">{`${tooltipData.platform} - ${tooltipData.age}`}</div>
            <div>{`${tooltipData.metric}: ${formatMetricValue(tooltipData.value, tooltipData.metric)}`}</div>
          </div>
        </Tooltip>
      )}
    </div>
  );
}

export const HeatmapChart = withTooltip(BaseHeatmapChart);