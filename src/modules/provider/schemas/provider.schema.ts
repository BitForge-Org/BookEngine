import mongoose, { Schema } from 'mongoose';
import {
  ProviderContactInfo,
  ProviderDocument,
  ProviderLocation,
  ProviderSocialLink,
} from '../interfaces/provider.interface';
import { ProviderBusiness } from '../../../common/enums/provider-business.enum';
import { ProviderStatus } from '../../../common/enums/provider-status.enum';
import { ProviderType } from '../../../common/enums/provider-type.enum';

const providerContactInfoSchema = new Schema<ProviderContactInfo>(
  {
    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      index: true,
      required : true
    },
    phone: {
      type: String,
      trim: true,
      maxlength: 20,
      unique: true,
      index: true,
      required : true
    },
  },
  { _id: false }
);

const providerLocationSchema = new Schema<ProviderLocation>(
  {
    address: {
      type: String,
      trim: true,
      maxlength: 255,
    },
    city: {
      type: String,
      trim: true,
      maxlength: 100,
    },
    state: {
      type: String,
      trim: true,
      maxlength: 100,
    },
    zip: {
      type: String,
      trim: true,
      maxlength: 6,
    },
    country: {
      type: String,
      trim: true,
      maxlength: 100,
    },
  },
  { _id: false }
);

const providerSocialLinkSchema = new Schema<ProviderSocialLink>(
  {
    platform: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      maxlength: 50,
    },
    url: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { _id: false }
);

const providerSchema = new Schema<ProviderDocument>(
  {
    ownerId: {
      type: Schema.Types.ObjectId,
      ref: 'AuthUser',
      required: false,
      index: true,
    },
    displayName: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 100,
    },

    businessName: {
      type: String,
      trim: true,
      maxlength: 150,
    },

    providerType: {
      type: String,
      enum: Object.values(ProviderType),
      required: true,
      trim: true,
    },

    providerBusiness: {
      type: String,
      enum: Object.values(ProviderBusiness),
      required: true,
      trim: true,
    },

    bookingSlug: {
      type: String,
      required: true,
      unique: true,
      index: true,
      trim: true,
      lowercase: true,
      minlength: 3,
      maxlength: 80,
      match: /^[a-z0-9-]+$/,
    },

    status: {
      type: String,
      enum: Object.values(ProviderStatus),
      default: ProviderStatus.DRAFT,
      index: true,
    },

    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },

    logoUrl: {
      type: String,
      trim: true,
    },

    bannerUrl: {
      type: String,
      trim: true,
    },

    description: {
      type: String,
      trim: true,
      maxlength: 1000,
    },

    website: {
      type: String,
      trim: true,
    },

    socialLinks: {
      type: [providerSocialLinkSchema],
      default: [],
    },

    contactInfo: {
      type: providerContactInfoSchema,
      default: undefined,
    },

    location: {
      type: providerLocationSchema,
      default: undefined,
    },

    timezone: {
      type: String,
      required: true,
      trim: true,
      default: 'Asia/Kolkata',
    },
    
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

providerSchema.index({ bookingSlug: 1 }, { unique: true });
providerSchema.index({ status: 1, isActive: 1 });
providerSchema.index({ providerType: 1 });
providerSchema.index({ providerBusiness: 1 });

export const ProviderModel = mongoose.model<ProviderDocument>(
  'Provider',
  providerSchema
);