import { SetupTokenModel } from './schemas/setup-token.schema';
import { Types } from 'mongoose';
import { AuthUserModel } from './schemas/auth-user.schema';

export class AuthRepository {
  async create(data: any) {
    return AuthUserModel.create(data);
  }

  async findByEmail(email: string) {
    return AuthUserModel.findOne({ email });
  }

  async findById(id: string) {
    return AuthUserModel.findById(id);
  }

  async updateLastLogin(id: string) {
    return AuthUserModel.findByIdAndUpdate(id, {
      lastLoginAt: new Date(),
    });
  }

  // =========================
  // Setup Token Methods
  // =========================

  async createSetupToken(data: {
    token: string;
    providerId: string | Types.ObjectId;
    email: string;
    expiresAt: Date;
  }) {
    return SetupTokenModel.create(data);
  }

  async findValidSetupToken(token: string) {
    return SetupTokenModel.findOne({
      token,
      used: false,
      expiresAt: { $gt: new Date() },
    });
  }

  async markSetupTokenAsUsed(tokenId: string) {
    return SetupTokenModel.findByIdAndUpdate(
      tokenId,
      { used: true },
      { new: true }
    );
  }
}