import axios from 'axios';
import { AUTH_CONFIG } from '../config/auth';
import { AuthResponse, TokenVerificationResponse } from '../types/auth';
import api from './api';

class AuthServiceClass {
  private readonly baseURL: string;

  constructor() {
    this.baseURL = AUTH_CONFIG.baseURL;
  }

  async verifyToken(token: string): Promise<TokenVerificationResponse> {
    try {
      const response = await api.post('/auth/verify-token', { token });
      return response.data;
    } catch (error) {
      throw new Error('Invalid or expired token');
    }
  }

  async loginWithEmail(email: string, password: string): Promise<AuthResponse> {
    try {
      const response = await api.post('/auth/login', { email, password });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || 'Login failed');
      }
      throw error;
    }
  }

  async loginWithGoogle(): Promise<void> {
    const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${
      AUTH_CONFIG.google.clientId
    }&redirect_uri=${encodeURIComponent(
      AUTH_CONFIG.google.redirectUri
    )}&response_type=code&scope=email profile`;
    window.location.href = url;
  }

  async loginWithGithub(): Promise<void> {
    const url = `https://github.com/login/oauth/authorize?client_id=${
      AUTH_CONFIG.github.clientId
    }&redirect_uri=${encodeURIComponent(AUTH_CONFIG.github.redirectUri)}`;
    window.location.href = url;
  }

  async loginWithLinkedin(): Promise<void> {
    const url = `https://www.linkedin.com/oauth/v2/authorization?client_id=${
      AUTH_CONFIG.linkedin.clientId
    }&redirect_uri=${encodeURIComponent(
      AUTH_CONFIG.linkedin.redirectUri
    )}&response_type=code&scope=r_liteprofile r_emailaddress`;
    window.location.href = url;
  }

  async verify2FA(code: string): Promise<AuthResponse> {
    try {
      const response = await api.post('/auth/verify-2fa', { code });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || 'Invalid verification code');
      }
      throw error;
    }
  }

  async logout(): Promise<void> {
    try {
      await api.post('/auth/logout');
    } catch (error) {
      console.error('Logout error:', error);
      // Continue with local logout even if server logout fails
    }
  }
}

export const AuthService = new AuthServiceClass();