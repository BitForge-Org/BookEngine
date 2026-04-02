import { Schema, model } from 'mongoose';

const AuthUserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },

    passwordHash: {
      type: String,
      required: false, // 🔥 important (set later during setup)
    },

    role: {
      type: String,
      enum: ['provider', 'admin'],
      default: 'provider',
      index: true,
    },

    isEmailVerified: {
      type: Boolean,
      default: false,
      index: true,
    },

    lastLoginAt: {
      type: Date,
    },

    // 🔐 Optional security features (good to keep from day 1)

    failedLoginAttempts: {
      type: Number,
      default: 0,
    },

    lockUntil: {
      type: Date,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// 🔥 Helpful indexes
AuthUserSchema.index({ email: 1 });
AuthUserSchema.index({ role: 1 });

export const AuthUserModel = model('AuthUser', AuthUserSchema);