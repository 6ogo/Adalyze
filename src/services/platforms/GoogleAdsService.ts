import { GoogleAdsApi } from 'google-ads-api';

export class GoogleAdsService {
  private client: GoogleAdsApi;

  constructor(credentials: any) {
    this.client = new GoogleAdsApi({
      client_id: credentials.clientId,
      client_secret: credentials.clientSecret,
      developer_token: credentials.developerToken,
      customer_id: credentials.customerId
    });
  }

  async getCampaignData(dateRange: { startDate: string; endDate: string }) {
    try {
      const customer = this.client.Customer();
      
      const campaigns = await customer.report({
        entity: "campaign",
        attributes: [
          "campaign.id",
          "campaign.name",
          "campaign.status",
          "campaign.bidding_strategy_type",
          "campaign_budget.amount_micros"
        ],
        metrics: [
          "metrics.cost_micros",
          "metrics.clicks",
          "metrics.impressions",
          "metrics.video_views",
          "metrics.engagements"
        ],
        constraints: {
          "campaign.status": "ENABLED"
        },
        date_range: {
          start_date: dateRange.startDate,
          end_date: dateRange.endDate
        }
      });

      return campaigns;
    } catch (error) {
      console.error('Google Ads API Error:', error);
      throw error;
    }
  }
}