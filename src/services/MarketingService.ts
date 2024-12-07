import { GoogleAdsService } from './platforms/GoogleAdsService';
import { MetaAdsService } from './platforms/MetaAdsService';
import { LinkedInAdsService } from './platforms/LinkedInAdsService';
import { TikTokAdsService } from './platforms/TikTokAdsService';
import api from './api';

export class MarketingService {
  private services: Map<string, any> = new Map();

  constructor() {
    // Initialize services when credentials are available
  }

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
  }) {
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
        return await service.getCampaignData(dateRange);
      }

      // If no specific platform is specified, get data from all connected platforms
      const allData = await Promise.all(
        Array.from(this.services.entries()).map(async ([platform, service]) => {
          const data = await service.getCampaignData(dateRange);
          return { platform, data };
        })
      );

      return allData;
    } catch (error) {
      console.error('Error fetching marketing data:', error);
      throw error;
    }
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