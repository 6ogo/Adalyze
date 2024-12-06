declare module 'linkedin-api-client' {
    export class Client {
      constructor(config: {
        clientId: string;
        clientSecret: string;
        accessToken: string;
      });
      rest: {
        get(options: any): Promise<any>;
      };
    }
  }
  