import pool from '../config/database.js';
import { 
  GoogleAdsService,
  MetaAdsService,
  LinkedInAdsService,
  TikTokAdsService
} from '../services/platforms/index.js';

export const connectPlatform = async (req, res) => {
  try {
    const { platform } = req.params;
    const { code } = req.body;
    const userId = req.user.id;

    // Check if integration already exists
    const [existing] = await pool.execute(
      'SELECT * FROM platform_integrations WHERE user_id = ? AND platform = ?',
      [userId, platform]
    );

    if (existing.length > 0) {
      return res.status(400).json({ message: 'Platform already connected' });
    }

    // Exchange auth code for access token
    let credentials;
    switch (platform) {
      case 'google':
        credentials = await GoogleAdsService.exchangeAuthCode(code);
        break;
      case 'meta':
        credentials = await MetaAdsService.exchangeAuthCode(code);
        break;
      case 'linkedin':
        credentials = await LinkedInAdsService.exchangeAuthCode(code);
        break;
      case 'tiktok':
        credentials = await TikTokAdsService.exchangeAuthCode(code);
        break;
      default:
        return res.status(400).json({ message: 'Unsupported platform' });
    }

    // Store integration details
    await pool.execute(
      'INSERT INTO platform_integrations (user_id, platform, access_token, refresh_token, expires_at) VALUES (?, ?, ?, ?, ?)',
      [userId, platform, credentials.accessToken, credentials.refreshToken, credentials.expiresAt]
    );

    // Store initial sync status
    await pool.execute(
      'INSERT INTO integration_syncs (integration_id, last_sync_at, status) VALUES (LAST_INSERT_ID(), NOW(), "PENDING")'
    );

    res.json({ message: 'Platform connected successfully', credentials });
  } catch (error) {
    console.error('Platform connection error:', error);
    res.status(500).json({ message: 'Failed to connect platform' });
  }
};

export const disconnectPlatform = async (req, res) => {
  try {
    const { platform } = req.params;
    const userId = req.user.id;

    await pool.execute(
      'DELETE FROM platform_integrations WHERE user_id = ? AND platform = ?',
      [userId, platform]
    );

    res.json({ message: 'Platform disconnected successfully' });
  } catch (error) {
    console.error('Platform disconnection error:', error);
    res.status(500).json({ message: 'Failed to disconnect platform' });
  }
};

export const getPlatformStatus = async (req, res) => {
  try {
    const { platform } = req.params;
    const userId = req.user.id;

    const [integration] = await pool.execute(
      `SELECT pi.*, is.status, is.last_sync_at 
       FROM platform_integrations pi
       LEFT JOIN integration_syncs is ON is.integration_id = pi.id
       WHERE pi.user_id = ? AND pi.platform = ?`,
      [userId, platform]
    );

    if (integration.length === 0) {
      return res.status(404).json({ message: 'Integration not found' });
    }

    res.json(integration[0]);
  } catch (error) {
    console.error('Platform status error:', error);
    res.status(500).json({ message: 'Failed to get platform status' });
  }
};

export const getIntegrationData = async (req, res) => {
  try {
    const { platform } = req.params;
    const { startDate, endDate } = req.query;
    const userId = req.user.id;

    const [integration] = await pool.execute(
      'SELECT * FROM platform_integrations WHERE user_id = ? AND platform = ?',
      [userId, platform]
    );

    if (integration.length === 0) {
      return res.status(404).json({ message: 'Integration not found' });
    }

    // Fetch data from platform-specific service
    let data;
    switch (platform) {
      case 'google':
        data = await GoogleAdsService.getCampaignData(integration[0], { startDate, endDate });
        break;
      case 'meta':
        data = await MetaAdsService.getCampaignData(integration[0], { startDate, endDate });
        break;
      case 'linkedin':
        data = await LinkedInAdsService.getCampaignData(integration[0], { startDate, endDate });
        break;
      case 'tiktok':
        data = await TikTokAdsService.getCampaignData(integration[0], { startDate, endDate });
        break;
      default:
        return res.status(400).json({ message: 'Unsupported platform' });
    }

    // Store the data in marketing_data table
    await pool.execute(
      'INSERT INTO marketing_data (integration_id, data, date_from, date_to) VALUES (?, ?, ?, ?)',
      [integration[0].id, JSON.stringify(data), startDate, endDate]
    );

    res.json(data);
  } catch (error) {
    console.error('Integration data error:', error);
    res.status(500).json({ message: 'Failed to get integration data' });
  }
};