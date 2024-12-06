declare module 'google-ads-api' {
    export class GoogleAdsApi {
      constructor(config: {
        client_id: string;
        client_secret: string;
        developer_token: string;
      });
      Customer(config: { customer_id: string }): any;
    }
  }