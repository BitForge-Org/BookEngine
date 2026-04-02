export type AuthRole = 'provider' | 'admin';

export interface JwtUserPayload {
  sub: string; // AuthUser _id
  role: AuthRole;
  iat?: number;
  exp?: number;
}