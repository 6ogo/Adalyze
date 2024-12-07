// src/services/auth.ts
import api from './api';
import { AuthResponse, TokenVerificationResponse } from '../types/auth';

class AuthServiceClass {
  async loginWithEmail(email: string, password: string): Promise<AuthResponse> {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  }

  async verify2FA(code: string): Promise<AuthResponse> {
    const response = await api.post('/auth/verify-2fa', { code });
    return response.data;
  }

  async verifyToken(token: string): Promise<TokenVerificationResponse> {
    const response = await api.post('/auth/verify-token', { token });
    return response.data;
  }

  // OAuth methods
  async loginWithGoogle(): Promise<void> {
    window.location.href = `/auth/google`;
  }

  async loginWithGithub(): Promise<void> {
    window.location.href = `/auth/github`;
  }

  async loginWithLinkedin(): Promise<void> {
    window.location.href = `/auth/linkedin`;
  }

  async logout(): Promise<void> {
    await api.post('/auth/logout');
  }
}

export const AuthService = new AuthServiceClass();