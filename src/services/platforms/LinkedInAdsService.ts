import { Client } from 'linkedin-api-client';

export class LinkedInAdsService {
  private client: Client;

  constructor(credentials: any) {
    this.client = new Client({
      clientId: credentials.clientId,
      clientSecret: credentials.clientSecret,
      accessToken: credentials.accessToken
    });
  }

  async getCampaignData(accountId: string, dateRange: { startDate: string; endDate: string }) {
    try {
      const response = await this.client.rest.get({
        path: `/adCampaignsV2`,
        query: {
          q: 'search',
          search: {
            account: [`urn:li:sponsoredAccount:${accountId}`],
            status: {
              values: ['ACTIVE']
            }
          },
          fields: [
            'id',
            'name',
            'status',
            'impressions',
            'clicks',
            'costInLocalCurrency',
            'videoViews',
            'engagementRate'
          ],
          timeGranularity: 'DAILY',
          dateRange: {
            start: dateRange.startDate,
            end: dateRange.endDate
          }
        }
      });

      return response;
    } catch (error) {
      console.error('LinkedIn Ads API Error:', error);
      throw error;
    }
  }
}