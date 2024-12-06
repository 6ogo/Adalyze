export interface User {
  id: string;
  email: string;
  picture?: string;
  name?: string;
}

export interface AuthResponse {
  user: User;
  token: string;
  requires2FA?: boolean;
}

export interface TokenVerificationResponse {
  user: User;
  exp: number;
}