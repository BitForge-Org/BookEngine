export interface UpdateProviderDto {
  displayName?: string;
  businessName?: string;
  providerType?: string;
  providerBusiness?: string;
  timezone?: string;
  bookingSlug?: string;

  logoUrl?: string;
  bannerUrl?: string;
  description?: string;
  website?: string;
  socialLinks?: {
    platform: string;
    url: string;
  }[];

  contactInfo?: {
    email?: string;
    phone?: string;
  };

  location?: {
    address?: string;
    city?: string;
    state?: string;
    zip?: string;
    country?: string;
  };
}