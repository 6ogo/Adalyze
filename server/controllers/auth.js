import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import speakeasy from 'speakeasy';
import nodemailer from 'nodemailer';
import pool from '../config/database.js';
import authConfig from '../config/auth.js';

// Email configuration
const transporter = nodemailer.createTransport({
  // Configure your email service here
});

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const [users] = await pool.execute(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );

    if (users.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const user = users[0];
    const isValidPassword = await bcrypt.compare(password, user.password_hash);

    if (!isValidPassword) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate 2FA code
    const secret = speakeasy.generateSecret();
    const code = speakeasy.totp({
      secret: secret.base32,
      encoding: 'base32'
    });

    // Store secret temporarily
    await pool.execute(
      'UPDATE users SET two_factor_secret = ? WHERE id = ?',
      [secret.base32, user.id]
    );

    // Send code via email
    await transporter.sendMail({
      from: 'noreply@adalyze.se',
      to: user.email,
      subject: 'Your verification code',
      text: `Your verification code is: ${code}`
    });

    return res.json({ requires2FA: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};

export const verify2FA = async (req, res) => {
  try {
    const { code } = req.body;
    
    // Verify code and generate JWT
    // Return user data and token
    
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};

export const refreshToken = async (req, res) => {
  // Implement token refresh logic
};

export const logout = async (req, res) => {
  // Implement logout logic
};