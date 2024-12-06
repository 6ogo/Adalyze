declare module 'tiktok-business-api' {
    export class TikTokBusinessApi {
      constructor(config: {
        accessToken: string;
        appId: string;
        secret: string;
      });
      report: {
        get(options: any): Promise<any>;
      };
    }
  }
  
  