const generateSeasonalData = () => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  return months.map((name, index) => {
    // Base multipliers for seasonal effects
    const seasonality = {
      // Higher engagement during spring/summer for most platforms
      spring: index >= 2 && index <= 4 ? 1.3 : 1,
      // Summer slump for LinkedIn, peak for Instagram
      summer: index >= 5 && index <= 7 ? 1.2 : 1,
      // Back to business season for LinkedIn
      fall: index >= 8 && index <= 10 ? 1.4 : 1,
      // Holiday season boost for all platforms
      winter: index >= 11 || index <= 1 ? 1.5 : 1
    };

    // Platform-specific patterns
    const facebook = {
      spend: Math.round(4000 * seasonality.winter * (1 + index * 0.03)), // Gradually increasing spend
      clicks: Math.round(12000 * seasonality.winter * (1 + Math.random() * 0.5)),
      impressions: Math.round(150000 * seasonality.winter * (1 + Math.random() * 0.3)),
      videoViews: Math.round(45000 * seasonality.spring * (1 + Math.random() * 0.4)),
      engagement: Math.round(8500 * seasonality.winter * (1 + Math.random() * 0.3))
    };

    const instagram = {
      spend: Math.round(2400 * seasonality.summer * (1 + index * 0.05)), // Faster growth than Facebook
      clicks: Math.round(8000 * seasonality.summer * (1 + Math.random() * 0.6)),
      impressions: Math.round(120000 * seasonality.summer * (1 + Math.random() * 0.4)),
      videoViews: Math.round(38000 * seasonality.summer * (1 + Math.random() * 0.5)),
      engagement: Math.round(7200 * seasonality.summer * (1 + Math.random() * 0.4))
    };

    const linkedin = {
      spend: Math.round(2400 * seasonality.fall * (1 + index * 0.04)),
      clicks: Math.round(6000 * seasonality.fall * (1 + Math.random() * 0.4)),
      impressions: Math.round(80000 * seasonality.fall * (1 + Math.random() * 0.3)),
      videoViews: Math.round(25000 * seasonality.fall * (1 + Math.random() * 0.3)),
      engagement: Math.round(4500 * seasonality.fall * (1 + Math.random() * 0.3))
    };

    const tiktok = {
      spend: Math.round(1800 * seasonality.spring * (1 + index * 0.06)), // Fastest growing platform
      clicks: Math.round(4000 * seasonality.spring * (1 + Math.random() * 0.7)),
      impressions: Math.round(95000 * seasonality.spring * (1 + Math.random() * 0.5)),
      videoViews: Math.round(52000 * seasonality.spring * (1 + Math.random() * 0.6)),
      engagement: Math.round(6800 * seasonality.spring * (1 + Math.random() * 0.5))
    };

    // Demographics with seasonal variations
    const demographics = {
      '18-24': {
        male: Math.round(20 * seasonality.summer * (1 + Math.random() * 0.3)),
        female: Math.round(25 * seasonality.summer * (1 + Math.random() * 0.3)),
        other: Math.round(5 * (1 + Math.random() * 0.2))
      },
      '25-34': {
        male: Math.round(15 * seasonality.fall * (1 + Math.random() * 0.3)),
        female: Math.round(20 * seasonality.fall * (1 + Math.random() * 0.3)),
        other: Math.round(3 * (1 + Math.random() * 0.2))
      },
      '35-44': {
        male: Math.round(10 * seasonality.winter * (1 + Math.random() * 0.3)),
        female: Math.round(12 * seasonality.winter * (1 + Math.random() * 0.3)),
        other: Math.round(2 * (1 + Math.random() * 0.2))
      },
      '45-54': {
        male: Math.round(8 * seasonality.spring * (1 + Math.random() * 0.3)),
        female: Math.round(10 * seasonality.spring * (1 + Math.random() * 0.3)),
        other: Math.round(1 * (1 + Math.random() * 0.2))
      },
      '55+': {
        male: Math.round(5 * (1 + Math.random() * 0.3)),
        female: Math.round(6 * (1 + Math.random() * 0.3)),
        other: Math.round(1 * (1 + Math.random() * 0.2))
      }
    };

    // Location distribution with seasonal trends
    const locations = {
      stockholm: Math.round(45 - (index * 0.5)), // Gradually decreasing
      gothenburg: Math.round(30 + (index * 0.5)), // Gradually increasing
      malmo: 25 // Stable
    };

    return {
      name,
      facebook,
      instagram,
      linkedin,
      tiktok,
      demographics,
      locations
    };
  });
};

export const rawDemoData = generateSeasonalData();

export default rawDemoData;