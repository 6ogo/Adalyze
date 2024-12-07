import { GoogleAdsService } from './platforms/GoogleAdsService';
import { MetaAdsService } from './platforms/MetaAdsService';
import { LinkedInAdsService } from './platforms/LinkedInAdsService';
import { TikTokAdsService } from './platforms/TikTokAdsService';
import api from './api';

interface MarketingData {
  spend: number;
  clicks: number;
  impressions: number;
  videoViews: number;
  engagement: number;
  ageGroups: {
    [key: string]: {
      spend: number;
      clicks: number;
      impressions: number;
      videoViews: number;
      engagement: number;
    };
  };
  campaigns: Array<{
    name: string;
    type: string;
    spend: number;
    clicks: number;
    impressions: number;
    videoViews: number;
    engagement: number;
    conversions: number;
  }>;
  revenue: number;
  conversions: number;
}

interface DateRange {
  startDate: string;
  endDate: string;
}

export class MarketingService {
  private services: Map<string, any> = new Map();

  async initializeService(platform: string, credentials: any) {
    switch (platform) {
      case 'google':
        this.services.set(platform, new GoogleAdsService(credentials));
        break;
      case 'meta':
        this.services.set(platform, new MetaAdsService(credentials));
        break;
      case 'linkedin':
        this.services.set(platform, new LinkedInAdsService(credentials));
        break;
      case 'tiktok':
        this.services.set(platform, new TikTokAdsService(credentials));
        break;
      default:
        throw new Error(`Unsupported platform: ${platform}`);
    }
  }

  async getMarketingData(params: {
    platform?: string;
    dateFrom: string;
    dateTo: string;
    metrics: string[];
  }): Promise<{ [key: string]: MarketingData }> {
    try {
      const dateRange = {
        startDate: params.dateFrom,
        endDate: params.dateTo
      };

      if (params.platform) {
        const service = this.services.get(params.platform);
        if (!service) {
          throw new Error(`Platform ${params.platform} not initialized`);
        }
        const data = await service.getCampaignData(dateRange);
        return this.transformPlatformData(params.platform, data);
      }

      // Get data from all connected platforms
      const allData = await Promise.all(
        Array.from(this.services.entries()).map(async ([platform, service]) => {
          const data = await service.getCampaignData(dateRange);
          return { platform, data };
        })
      );

      // Transform and combine data
      return allData.reduce((acc, { platform, data }) => {
        acc[platform] = this.transformPlatformData(platform, data);
        return acc;
      }, {} as { [key: string]: MarketingData });
    } catch (error) {
      console.error('Error fetching marketing data:', error);
      throw error;
    }
  }

  private transformPlatformData(platform: string, data: any): MarketingData {
    // Transform platform-specific data into common format
    const transformed: MarketingData = {
      spend: 0,
      clicks: 0,
      impressions: 0,
      videoViews: 0,
      engagement: 0,
      ageGroups: {},
      campaigns: [],
      revenue: 0,
      conversions: 0
    };

    switch (platform) {
      case 'google':
        // Transform Google Ads data
        transformed.spend = data.metrics.cost_micros / 1000000;
        transformed.clicks = data.metrics.clicks;
        transformed.impressions = data.metrics.impressions;
        transformed.videoViews = data.metrics.video_views;
        transformed.engagement = data.metrics.engagements;
        break;

      case 'meta':
        // Transform Meta Ads data
        transformed.spend = data.spend;
        transformed.clicks = data.clicks;
        transformed.impressions = data.impressions;
        transformed.videoViews = data.video_p75_watched_actions;
        transformed.engagement = data.actions.filter((a: any) => 
          ['like', 'comment', 'share'].includes(a.action_type)
        ).reduce((sum: number, a: any) => sum + a.value, 0);
        break;

      case 'linkedin':
        // Transform LinkedIn Ads data
        transformed.spend = data.costInLocalCurrency;
        transformed.clicks = data.clicks;
        transformed.impressions = data.impressions;
        transformed.videoViews = data.videoViews;
        transformed.engagement = Math.round(data.engagementRate * data.impressions);
        break;

      case 'tiktok':
        // Transform TikTok Ads data
        transformed.spend = data.statistics.spend;
        transformed.clicks = data.statistics.clicks;
        transformed.impressions = data.statistics.impressions;
        transformed.videoViews = data.statistics.video_play_actions;
        transformed.engagement = data.statistics.engagement;
        break;
    }

    // Transform age group data
    if (data.demographics) {
      transformed.ageGroups = this.transformAgeGroupData(data.demographics);
    }

    // Transform campaign data
    if (data.campaigns) {
      transformed.campaigns = this.transformCampaignData(data.campaigns);
    }

    return transformed;
  }

  private transformAgeGroupData(demographics: any) {
    const ageGroups: { [key: string]: any } = {};
    const ageRanges = ['18-24', '25-34', '35-44', '45-54', '55+'];

    ageRanges.forEach(range => {
      ageGroups[range] = {
        spend: 0,
        clicks: 0,
        impressions: 0,
        videoViews: 0,
        engagement: 0
      };
    });

    // Transform platform-specific demographic data
    // Implementation depends on the specific format of each platform's demographic data

    return ageGroups;
  }

  private transformCampaignData(campaigns: any[]) {
    return campaigns.map(campaign => ({
      name: campaign.name,
      type: campaign.objective || 'other',
      spend: campaign.spend || 0,
      clicks: campaign.clicks || 0,
      impressions: campaign.impressions || 0,
      videoViews: campaign.videoViews || 0,
      engagement: campaign.engagement || 0,
      conversions: campaign.conversions || 0
    }));
  }

  async connectPlatform(platform: string, authCode: string) {
    try {
      const response = await api.post(`/integrations/${platform}/connect`, { code: authCode });
      await this.initializeService(platform, response.data.credentials);
      return response.data;
    } catch (error) {
      console.error(`Error connecting to ${platform}:`, error);
      throw error;
    }
  }

  async disconnectPlatform(platform: string) {
    try {
      await api.post(`/integrations/${platform}/disconnect`);
      this.services.delete(platform);
    } catch (error) {
      console.error(`Error disconnecting from ${platform}:`, error);
      throw error;
    }
  }
}

export const marketingService = new MarketingService();