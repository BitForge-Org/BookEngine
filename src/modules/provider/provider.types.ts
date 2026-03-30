export type ProviderPublicProfile = {
  id: string;
  displayName: string;
  bookingSlug: string;
  logoUrl?: string;
  bannerUrl?: string;
  description?: string;
  website?: string;
  socialLinks?: {
    platform: string;
    url: string;
  }[];
  timezone: string;
};

export type ProviderInternalSummary = {
  id: string;
  displayName: string;
  providerType: string;
  providerBusiness: string;
  status: string;
  isActive: boolean;
  timezone: string;
};