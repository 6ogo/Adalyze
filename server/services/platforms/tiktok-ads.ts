import { TikTokBusinessApi } from 'tiktok-business-api';

export class TikTokAdsService {
  private client: TikTokBusinessApi;

  constructor(credentials: any) {
    this.client = new TikTokBusinessApi({
      accessToken: credentials.accessToken,
      appId: credentials.appId,
      secret: credentials.secret
    });
  }

  async getCampaignData(advertiserId: string, dateRange: any) {
    return await this.client.report.get({
      advertiser_id: advertiserId,
      report_type: 'BASIC',
      dimensions: ['campaign_id', 'campaign_name'],
      metrics: [
        'impressions',
        'clicks',
        'spend',
        'video_play_actions',
        'engagement_rate'
      ],
      filters: {
        campaign_status: 'CAMPAIGN_STATUS_ENABLE'
      },
      start_date: dateRange.startDate,
      end_date: dateRange.endDate
    });
  }
}
