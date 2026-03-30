import { ProviderBusiness } from '../../../common/enums/provider-business.enum';
import { ProviderType } from '../../../common/enums/provider-type.enum';

export interface UpdateProviderContactInfoDto {
  email?: string;
  phone?: string;
}

export interface UpdateProviderLocationDto {
  address?: string;
  city?: string;
  state?: string;
  zip?: string;
  country?: string;
}

export interface UpdateProviderSocialLinkDto {
  platform: string;
  url: string;
}

export interface UpdateProviderDto {
  displayName?: string;
  businessName?: string;
  providerType?: ProviderType;
  providerBusiness?: ProviderBusiness;
  bookingSlug?: string;

  logoUrl?: string;
  bannerUrl?: string;
  description?: string;
  website?: string;
  socialLinks?: UpdateProviderSocialLinkDto[];

  contactInfo?: UpdateProviderContactInfoDto;
  location?: UpdateProviderLocationDto;

  timezone?: string;
}