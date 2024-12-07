export const AVAILABLE_METRICS = [
  { label: 'Ad Spend', value: 'spend' },
  { label: 'Clicks', value: 'clicks' },
  { label: 'Impressions', value: 'impressions' },
  { label: 'Video Views', value: 'videoViews' },
  { label: 'Engagement', value: 'engagement' }
];

export const DEFAULT_CHART_SETTINGS = {
  timeline: {
    showLegend: true,
    showGrid: true
  },
  distribution: {
    showLabels: true,
    showLegend: true
  },
  heatmap: {
    showTooltip: true,
    showLegend: true
  },
  seasonality: {
    showGrid: true,
    showLegend: true
  },
  funnel: {
    showValues: true,
    showLabels: true
  },
  roi: {
    showValues: true,
    showGrid: true
  },
  campaigns: {
    sortBy: 'spend',
    order: 'desc'
  }
};

export function formatMetricValue(value: number, metric: string): string {
  switch (metric) {
    case 'spend':
      return `$${value.toLocaleString()}`;
    case 'impressions':
    case 'clicks':
    case 'videoViews':
    case 'engagement':
      return value.toLocaleString();
    default:
      return value.toString();
  }
}

export function getMetricLabel(metric: string): string {
  const metricInfo = AVAILABLE_METRICS.find(m => m.value === metric);
  return metricInfo ? metricInfo.label : metric;
}

export function calculatePercentageChange(current: number, previous: number): string {
  if (!previous) return '+0%';
  const change = ((current - previous) / previous) * 100;
  return `${change > 0 ? '+' : ''}${change.toFixed(1)}%`;
}

export function generateHeatmapData(data: any[], metric: string) {
  const lastMonth = data[data.length - 1];
  if (!lastMonth) return [];

  const ageGroups = ['18-24', '25-34', '35-44', '45-54', '55+'];
  const platforms = ['facebook', 'instagram', 'linkedin', 'tiktok'];

  return ageGroups.map((age, i) => ({
    y: age,
    bins: platforms.map((platform, j) => ({
      x: platform,
      value: lastMonth[platform].ageGroups[age][metric]
    }))
  }));
}