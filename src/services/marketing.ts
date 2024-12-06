import api from './api';

class MarketingServiceClass {
  async connectPlatform(platform: string, authCode: string) {
    return api.post(`/integrations/${platform}/connect`, { code: authCode });
  }

  async disconnectPlatform(platform: string) {
    return api.post(`/integrations/${platform}/disconnect`);
  }

  async getPlatformStatus(platform: string) {
    return api.get(`/integrations/${platform}/status`);
  }

  async getMarketingData(params: {
    platform?: string;
    dateFrom: string;
    dateTo: string;
    metrics: string[];
  }) {
    return api.get('/marketing/data', { params });
  }
}

export const MarketingService = new MarketingServiceClass();
