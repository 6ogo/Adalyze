import express from 'express';
import { 
  connectPlatform,
  disconnectPlatform,
  getPlatformStatus,
  getIntegrationData
} from '../controllers/integrations.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// All routes require authentication
router.use(authenticateToken);

// Platform connection routes
router.post('/:platform/connect', connectPlatform);
router.post('/:platform/disconnect', disconnectPlatform);
router.get('/:platform/status', getPlatformStatus);
router.get('/:platform/data', getIntegrationData);

export default router;