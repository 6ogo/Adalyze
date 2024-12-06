declare module 'facebook-business' {
    export class FacebookAdsApi {
      static init(config: {
        accessToken: string;
        appId: string;
        appSecret: string;
      }): FacebookAdsApi;
      AdAccount(id: string): any;
    }
  }
  