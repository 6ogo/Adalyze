import { FacebookAdsApi } from 'facebook-business';

export class MetaAdsService {
  private api: FacebookAdsApi;

  constructor(credentials: any) {
    this.api = new FacebookAdsApi.init({
      accessToken: credentials.accessToken,
      appId: credentials.appId,
      appSecret: credentials.appSecret
    });
  }

  async getCampaignData(accountId: string, dateRange: any) {
    const account = new this.api.AdAccount(`act_${accountId}`);
    
    return await account.getInsights([], {
      level: 'campaign',
      fields: [
        'campaign_id',
        'campaign_name',
        'impressions',
        'clicks',
        'spend',
        'video_p75_watched_actions',
        'actions'
      ],
      time_range: {
        'since': dateRange.startDate,
        'until': dateRange.endDate
      },
      filtering: [
        {
          field: 'campaign.status',
          operator: 'IN',
          value: ['ACTIVE']
        }
      ]
    });
  }
}