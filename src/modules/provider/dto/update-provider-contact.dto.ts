export interface UpdateProviderContactDto {
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