// server/services/marketing.ts
import { GoogleAdsService } from './platforms/google-ads';
import { MetaAdsService } from './platforms/meta-ads';
import { LinkedInAdsService } from './platforms/linkedin-ads';
import { TikTokAdsService } from './platforms/tiktok-ads';
import pool from '../config/database';

interface Credentials {
  google?: {
    clientId: string;
    clientSecret: string;
    developerToken: string;
  };
  meta?: {
    accessToken: string;
    appId: string;
    appSecret: string;
  };
  linkedin?: {
    clientId: string;
    clientSecret: string;
    accessToken: string;
  };
  tiktok?: {
    accessToken: string;
    appId: string;
    secret: string;
  };
}

export class MarketingService {
  private credentials: Credentials;

  constructor(credentials: Credentials) {
    this.credentials = credentials;
  }

  async getIntegratedPlatforms(userId: number) {
    const [integrations] = await pool.execute(
      'SELECT platform, credentials FROM integrations WHERE user_id = ?',
      [userId]
    );
    return integrations;
  }

  async getMarketingData(userId: number, dateRange: any) {
    const platforms = await this.getIntegratedPlatforms(userId);
    const data: Record<string, any> = {};

    for (const platform of platforms) {
      const service = this.getPlatformService(platform.platform, platform.credentials);
      const platformData = await service.getCampaignData(userId, dateRange);
      data[platform.platform] = this.transformData(platformData);
    }

    return data;
  }

  private getPlatformService(platform: string, credentials: any) {
    switch (platform) {
      case 'google':
        return new GoogleAdsService(credentials);
      case 'meta':
        return new MetaAdsService(credentials);
      case 'linkedin':
        return new LinkedInAdsService(credentials);
      case 'tiktok':
        return new TikTokAdsService(credentials);
      default:
        throw new Error(`Unsupported platform: ${platform}`);
    }
  }

  private transformData(rawData: any) {
    return {
      impressions: rawData.impressions,
      clicks: rawData.clicks,
      spend: rawData.spend,
      videoViews: rawData.video_views || rawData.videoViews,
      engagement: rawData.engagement || rawData.engagements
    };
  }
}