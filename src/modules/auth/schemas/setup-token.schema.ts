import { Schema, model } from 'mongoose';
import { SetupTokenDocument } from '../interfaces/setup-token.interface';

const SetupTokenSchema = new Schema<SetupTokenDocument>(
  {
    token: {
      type: String,
      required: true,
      unique: true,
      index: true,
      trim: true,
    },

    providerId: {
      type: Schema.Types.ObjectId,
      ref: 'Provider',
      required: true,
      index: true,
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      index: true,
    },

    expiresAt: {
      type: Date,
      required: true,
      index: true,
    },

    used: {
      type: Boolean,
      default: false,
      index: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// Optional helpful index
SetupTokenSchema.index({ token: 1, used: 1, expiresAt: 1 });

export const SetupTokenModel = model<SetupTokenDocument>(
  'SetupToken',
  SetupTokenSchema
);