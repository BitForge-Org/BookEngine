import { ProviderBusiness } from '../../../common/enums/provider-business.enum';
import { ProviderType } from '../../../common/enums/provider-type.enum';

export interface ProviderPublicResponseSocialLinkDto {
  platform: string;
  url: string;
}

export interface ProviderPublicResponseContactInfoDto {
  email?: string;
  phone?: string;
}

export interface ProviderPublicResponseLocationDto {
  city?: string;
  state?: string;
  country?: string;
}

export interface ProviderPublicResponseDto {
  displayName: string;
  businessName?: string;
  providerType: ProviderType;
  providerBusiness: ProviderBusiness;
  bookingSlug: string;

  logoUrl?: string;
  bannerUrl?: string;
  description?: string;
  website?: string;
  socialLinks?: ProviderPublicResponseSocialLinkDto[];

  contactInfo?: ProviderPublicResponseContactInfoDto;
  location?: ProviderPublicResponseLocationDto;

  timezone: string;
}