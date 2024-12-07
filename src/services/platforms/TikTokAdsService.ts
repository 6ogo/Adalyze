import { TiktokApi } from '@tobyg74/tiktok-api-dl';

export class TikTokAdsService {
  private client: any;

  constructor(credentials: any) {
    this.client = new TiktokApi({
      accessToken: credentials.accessToken,
      appId: credentials.appId,
      secret: credentials.secret
    });
  }

  async getCampaignData(advertiserId: string, dateRange: { startDate: string; endDate: string }) {
    try {
      const response = await this.client.business.getAdCampaigns({
        advertiser_id: advertiserId,
        fields: [
          'campaign_id',
          'campaign_name',
          'status',
          'objective_type',
          'budget',
          'budget_mode',
          'statistics'
        ],
        filtering: {
          status: 'CAMPAIGN_STATUS_ENABLE'
        },
        page_size: 100,
        start_time: dateRange.startDate,
        end_time: dateRange.endDate
      });

      return response;
    } catch (error) {
      console.error('TikTok Ads API Error:', error);
      throw error;
    }
  }
}