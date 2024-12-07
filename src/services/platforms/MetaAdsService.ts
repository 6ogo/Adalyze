import { FacebookAdsApi } from 'facebook-nodejs-business-sdk';

export class MetaAdsService {
  private api: typeof FacebookAdsApi;

  constructor(credentials: any) {
    this.api = FacebookAdsApi.init(credentials.accessToken);
  }

  async getCampaignData(accountId: string, dateRange: { startDate: string; endDate: string }) {
    try {
      const account = new this.api.AdAccount(`act_${accountId}`);
      
      const insights = await account.getInsights(
        [
          'campaign_id',
          'campaign_name',
          'impressions',
          'clicks',
          'spend',
          'video_p75_watched_actions',
          'actions'
        ],
        {
          time_range: {
            'since': dateRange.startDate,
            'until': dateRange.endDate
          },
          level: 'campaign',
          breakdowns: ['age', 'gender', 'country']
        }
      );

      return insights;
    } catch (error) {
      console.error('Meta Ads API Error:', error);
      throw error;
    }
  }
}