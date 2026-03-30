import { ProviderBusiness } from '../../../common/enums/provider-business.enum';
import { ProviderType } from '../../../common/enums/provider-type.enum';

export interface CreateProviderContactInfoDto {
  email?: string;
  phone?: string;
}

export interface CreateProviderLocationDto {
  address?: string;
  city?: string;
  state?: string;
  zip?: string;
  country?: string;
}

export interface CreateProviderSocialLinkDto {
  platform: string;
  url: string;
}

export interface CreateProviderDto {
  displayName: string;
  businessName?: string;
  providerType: ProviderType;
  providerBusiness: ProviderBusiness;
  bookingSlug: string;

  logoUrl?: string;
  bannerUrl?: string;
  description?: string;
  website?: string;
  socialLinks?: CreateProviderSocialLinkDto[];

  contactInfo?: CreateProviderContactInfoDto;
  location?: CreateProviderLocationDto;

  timezone: string;
}