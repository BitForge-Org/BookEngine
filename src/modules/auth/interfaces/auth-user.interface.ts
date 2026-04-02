import { Document } from 'mongoose';

export interface AuthUserDocument extends Document {
  email: string;
  passwordHash?: string;
  role: 'provider' | 'admin';
  isEmailVerified: boolean;
  lastLoginAt?: Date;
  failedLoginAttempts: number;
  lockUntil?: Date;
  createdAt: Date;
  updatedAt: Date;
}