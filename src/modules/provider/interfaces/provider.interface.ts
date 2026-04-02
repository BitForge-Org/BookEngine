import { Document, Types } from 'mongoose';
import { ProviderBusiness } from '../../../common/enums/provider-business.enum';
import { ProviderStatus } from '../../../common/enums/provider-status.enum';
import { ProviderType } from '../../../common/enums/provider-type.enum';

export interface ProviderContactInfo {
  email?: string;
  phone?: string;
}

export interface ProviderLocation {
  address?: string;
  city?: string;
  state?: string;
  zip?: string;
  country?: string;
}

export interface ProviderSocialLink {
  platform: string;
  url: string;
}

export interface Provider {
  ownerId?: Types.ObjectId;
  displayName: string;
  businessName?: string;
  providerType: ProviderType;
  providerBusiness: ProviderBusiness;
  bookingSlug: string;

  status: ProviderStatus;
  isActive: boolean;

  logoUrl?: string;
  bannerUrl?: string;
  description?: string;
  website?: string;
  socialLinks?: ProviderSocialLink[];

  contactInfo?: ProviderContactInfo;
  location?: ProviderLocation;

  timezone: string;
}

export interface ProviderDocument extends Provider, Document {
  createdAt: Date;
  updatedAt: Date;
}