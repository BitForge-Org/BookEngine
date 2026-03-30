import { ProviderBusiness } from '../../../common/enums/provider-business.enum';
import { ProviderStatus } from '../../../common/enums/provider-status.enum';
import { ProviderType } from '../../../common/enums/provider-type.enum';

export interface ProviderResponseContactInfoDto {
  email?: string;
  phone?: string;
}

export interface ProviderResponseLocationDto {
  address?: string;
  city?: string;
  state?: string;
  zip?: string;
  country?: string;
}

export interface ProviderResponseSocialLinkDto {
  platform: string;
  url: string;
}

export interface ProviderResponseDto {
  id: string;
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
  socialLinks?: ProviderResponseSocialLinkDto[];

  contactInfo?: ProviderResponseContactInfoDto;
  location?: ProviderResponseLocationDto;

  timezone: string;
  createdAt: Date;
  updatedAt: Date;
}