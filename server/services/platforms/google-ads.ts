// server/services/platforms/google-ads.ts
import { GoogleAdsApi } from 'google-ads-api';

export class GoogleAdsService {
  private client: GoogleAdsApi;

  constructor(credentials: any) {
    this.client = new GoogleAdsApi({
      client_id: credentials.clientId,
      client_secret: credentials.clientSecret,
      developer_token: credentials.developerToken
    });
  }

  async getCampaignData(customerId: string, dateRange: any) {
    const customer = this.client.Customer({
      customer_id: customerId
    });

    return await customer.report({
      entity: "campaign",
      attributes: [
        "campaign.id",
        "campaign.name",
        "campaign.status"
      ],
      metrics: [
        "metrics.impressions",
        "metrics.clicks",
        "metrics.cost_micros",
        "metrics.video_views",
        "metrics.engagements"
      ],
      constraints: {
        "campaign.status": "ENABLED"
      },
      date_range: dateRange
    });
  }
}