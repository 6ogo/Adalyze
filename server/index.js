import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import integrationsRoutes from './routes/integrations.js';
import marketingRoutes from './routes/marketing.js';
import { setupPassport } from './config/passport.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));
app.use(express.json());

// Setup Passport.js
setupPassport(app);

// Routes
app.use('/auth', authRoutes);
app.use('/integrations', integrationsRoutes);
app.use('/marketing', marketingRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});