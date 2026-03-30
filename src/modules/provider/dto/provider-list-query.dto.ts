export interface ProviderListQueryDto {
  page?: number;
  limit?: number;
  providerType?: string;
  providerBusiness?: string;
  status?: string;
  isActive?: boolean;
  search?: string;
}