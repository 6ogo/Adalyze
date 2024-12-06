// server/utils/dataTransformer.js
export const transformPlatformData = (rawData, platform) => {
    switch (platform) {
      case 'facebook':
        return transformFacebookData(rawData);
      case 'google':
        return transformGoogleData(rawData);
      // etc.
    }
  };
  
  const transformFacebookData = (rawData) => {
    return {
      impressions: rawData.impressions,
      clicks: rawData.clicks,
      spend: rawData.spend,
      conversions: rawData.actions?.filter(a => a.type === 'conversion')?.length || 0,
      // etc.
    };
  };
  