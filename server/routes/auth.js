import express from 'express';
import { login, verify2FA, refreshToken, logout } from '../controllers/auth.js';
import passport from 'passport';

const router = express.Router();

router.post('/login', login);
router.post('/verify-2fa', verify2FA);
router.post('/refresh', refreshToken);
router.post('/logout', logout);

// OAuth routes
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/github', passport.authenticate('github', { scope: ['user:email'] }));
router.get('/linkedin', passport.authenticate('linkedin', { scope: ['r_emailaddress', 'r_liteprofile'] }));

// OAuth callbacks
router.get('/google/callback', passport.authenticate('google'), (req, res) => {
  res.redirect(`${process.env.FRONTEND_URL}/dashboard`);
});

router.get('/github/callback', passport.authenticate('github'), (req, res) => {
  res.redirect(`${process.env.FRONTEND_URL}/dashboard`);
});

router.get('/linkedin/callback', passport.authenticate('linkedin'), (req, res) => {
  res.redirect(`${process.env.FRONTEND_URL}/dashboard`);
});

export default router;