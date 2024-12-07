const generateSeasonalData = () => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  // Campaign templates
  const campaigns = {
    facebook: [
      { name: 'Brand Awareness', type: 'awareness' },
      { name: 'Lead Generation', type: 'conversion' },
      { name: 'Product Sales', type: 'sales' }
    ],
    instagram: [
      { name: 'Influencer Marketing', type: 'awareness' },
      { name: 'Story Ads', type: 'engagement' },
      { name: 'Shop Now', type: 'sales' }
    ],
    linkedin: [
      { name: 'B2B Lead Gen', type: 'conversion' },
      { name: 'Thought Leadership', type: 'awareness' },
      { name: 'Job Recruitment', type: 'other' }
    ],
    tiktok: [
      { name: 'Viral Challenge', type: 'awareness' },
      { name: 'In-Feed Ads', type: 'engagement' },
      { name: 'Product Showcase', type: 'sales' }
    ]
  };

  return months.map((name, index) => {
    // Seasonal effects
    const seasonality = {
      spring: index >= 2 && index <= 4 ? 1.3 : 1,
      summer: index >= 5 && index <= 7 ? 1.2 : 1,
      fall: index >= 8 && index <= 10 ? 1.4 : 1,
      winter: index >= 11 || index <= 1 ? 1.5 : 1
    };

    // Generate platform data with age group distribution and campaigns
    const generatePlatformData = (baseSpend: number, seasonMultiplier: number, platformCampaigns: any[]) => {
      const spend = Math.round(baseSpend * seasonMultiplier * (1 + Math.random() * 0.3));
      const clicks = Math.round(spend * (2.5 + Math.random()));
      const impressions = Math.round(spend * (30 + Math.random() * 10));
      const videoViews = Math.round(spend * (8 + Math.random() * 4));
      const engagement = Math.round(spend * (1.5 + Math.random()));
      
      // Generate campaign-specific data
      const campaigns = platformCampaigns.map(campaign => {
        const campaignSpend = Math.round(spend / platformCampaigns.length * (0.8 + Math.random() * 0.4));
        return {
          ...campaign,
          spend: campaignSpend,
          clicks: Math.round(campaignSpend * (2 + Math.random())),
          impressions: Math.round(campaignSpend * (25 + Math.random() * 10)),
          videoViews: Math.round(campaignSpend * (6 + Math.random() * 4)),
          engagement: Math.round(campaignSpend * (1.2 + Math.random())),
          conversions: Math.round(campaignSpend * (0.02 + Math.random() * 0.03))
        };
      });

      // Age group distribution
      const ageGroups = {
        '18-24': generateMetricsForAgeGroup(0.25, { spend, clicks, impressions, videoViews, engagement }),
        '25-34': generateMetricsForAgeGroup(0.35, { spend, clicks, impressions, videoViews, engagement }),
        '35-44': generateMetricsForAgeGroup(0.20, { spend, clicks, impressions, videoViews, engagement }),
        '45-54': generateMetricsForAgeGroup(0.15, { spend, clicks, impressions, videoViews, engagement }),
        '55+': generateMetricsForAgeGroup(0.05, { spend, clicks, impressions, videoViews, engagement })
      };

      return {
        spend,
        clicks,
        impressions,
        videoViews,
        engagement,
        ageGroups,
        campaigns,
        revenue: Math.round(spend * (2 + Math.random())), // ROI between 2-3x
        conversions: Math.round(clicks * (0.02 + Math.random() * 0.03)) // 2-5% conversion rate
      };
    };

    return {
      name,
      facebook: generatePlatformData(4000, seasonality.winter, campaigns.facebook),
      instagram: generatePlatformData(2400, seasonality.summer, campaigns.instagram),
      linkedin: generatePlatformData(2400, seasonality.fall, campaigns.linkedin),
      tiktok: generatePlatformData(1800, seasonality.spring, campaigns.tiktok)
    };
  });
};

function generateMetricsForAgeGroup(percentage: number, metrics: any) {
  const randomVariation = () => 1 + (Math.random() * 0.2 - 0.1); // ±10% variation
  return {
    spend: Math.round(metrics.spend * percentage * randomVariation()),
    clicks: Math.round(metrics.clicks * percentage * randomVariation()),
    impressions: Math.round(metrics.impressions * percentage * randomVariation()),
    videoViews: Math.round(metrics.videoViews * percentage * randomVariation()),
    engagement: Math.round(metrics.engagement * percentage * randomVariation())
  };
}

export const generateSeasonalityData = (data: any[]) => {
  const platforms = ['facebook', 'instagram', 'linkedin', 'tiktok'];
  const metrics = ['spend', 'clicks', 'impressions', 'videoViews', 'engagement'];
  
  return data.map(month => {
    const seasonalityData: any = { name: month.name };
    
    platforms.forEach(platform => {
      metrics.forEach(metric => {
        seasonalityData[`${platform}_${metric}`] = month[platform][metric];
      });
    });
    
    return seasonalityData;
  });
};

export const generateFunnelData = (data: any[]) => {
  const lastMonth = data[data.length - 1];
  const platforms = ['facebook', 'instagram', 'linkedin', 'tiktok'];
  
  const totals = platforms.reduce((acc, platform) => {
    acc.impressions += lastMonth[platform].impressions;
    acc.clicks += lastMonth[platform].clicks;
    acc.conversions += lastMonth[platform].conversions;
    return acc;
  }, { impressions: 0, clicks: 0, conversions: 0 });

  return [
    { name: 'Impressions', value: totals.impressions },
    { name: 'Clicks', value: totals.clicks },
    { name: 'Conversions', value: totals.conversions }
  ];
};

export const generateROIData = (data: any[]) => {
  return data.map(month => {
    const platforms = ['facebook', 'instagram', 'linkedin', 'tiktok'];
    const totals = platforms.reduce((acc, platform) => {
      acc.spend += month[platform].spend;
      acc.revenue += month[platform].revenue;
      return acc;
    }, { spend: 0, revenue: 0 });

    return {
      name: month.name,
      spend: totals.spend,
      revenue: totals.revenue,
      roi: ((totals.revenue - totals.spend) / totals.spend * 100).toFixed(1)
    };
  });
};

const rawDemoData = generateSeasonalData();

export default rawDemoData;