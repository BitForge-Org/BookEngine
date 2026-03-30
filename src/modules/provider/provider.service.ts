import { CreateProviderDto } from './dto/create-provider.dto';
import { ProviderPublicResponseDto } from './dto/provider-public-response.dto';
import { ProviderResponseDto } from './dto/provider-response.dto';
import { UpdateProviderDto } from './dto/update-provider.dto';
import { ProviderDocument } from './interfaces/provider.interface';
import { ProviderRepository } from './provider.repository';
import { ProviderStatus } from '../../common/enums/provider-status.enum';
import {
  BadRequestError,
  ConflictError,
  ForbiddenError,
  NotFoundError,
} from '../../common/errors';
import { ProviderListQueryDto } from './dto/provider-list-query.dto';

export class ProviderService {
  private readonly providerRepository = new ProviderRepository();

  async createProvider(dto: CreateProviderDto): Promise<ProviderResponseDto> {
    const slugExists = await this.providerRepository.existsBySlug(dto.bookingSlug);

    if (slugExists) {
      throw new ConflictError('Booking slug already exists');
    }

    if (dto.contactInfo?.email) {
      const emailExists = await this.providerRepository.existsByContactEmail(
        dto.contactInfo.email
      );

      if (emailExists) {
        throw new ConflictError('Provider contact email already exists');
      }
    }

    if (dto.contactInfo?.phone) {
      const phoneExists = await this.providerRepository.existsByContactPhone(
        dto.contactInfo.phone
      );

      if (phoneExists) {
        throw new ConflictError('Provider contact phone already exists');
      }
    }

    const createdProvider = await this.providerRepository.create({
      ...dto,
      status: ProviderStatus.DRAFT,
      isActive: true,
    });

    return this.toProviderResponseDto(createdProvider);
  }

  async getProviderById(id: string): Promise<ProviderResponseDto> {
    const provider = await this.providerRepository.findById(id);

    if (!provider) {
      throw new NotFoundError('Provider not found');
    }

    return this.toProviderResponseDto(provider);
  }

  async getProviderBySlug(bookingSlug: string): Promise<ProviderResponseDto> {
    const provider = await this.providerRepository.findBySlug(bookingSlug);

    if (!provider) {
      throw new NotFoundError('Provider not found');
    }

    return this.toProviderResponseDto(provider);
  }

  async getPublicProviderBySlug(
    bookingSlug: string
  ): Promise<ProviderPublicResponseDto> {
    const provider = await this.providerRepository.findBySlug(bookingSlug);

    if (!provider) {
      throw new NotFoundError('Provider not found');
    }

    if (!provider.isActive || provider.status !== ProviderStatus.ACTIVE) {
      throw new ForbiddenError('Provider is not publicly available');
    }

    return this.toProviderPublicResponseDto(provider);
  }

 async getAllProviders(
  query: ProviderListQueryDto
): Promise<{
  data: ProviderResponseDto[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}> {
  const page = Math.max(1, Number(query.page) || 1);
  const limit = Math.min(50, Number(query.limit) || 10); // max cap

  const filter: any = {};

  if (query.providerType) {
    filter.providerType = query.providerType;
  }

  if (query.status) {
    filter.status = query.status;
  }

  if (query.isActive !== undefined) {
    filter.isActive = query.isActive;
  }

  const { data, total } = await this.providerRepository.findPaginated(
    filter,
    page,
    limit
  );

  return {
    data: data.map((provider) => this.toProviderResponseDto(provider)),
    meta: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
}

  async updateProvider(
    id: string,
    dto: UpdateProviderDto
  ): Promise<ProviderResponseDto> {
    const existingProvider = await this.providerRepository.findById(id);

    if (!existingProvider) {
      throw new NotFoundError('Provider not found');
    }

    if (dto.bookingSlug && dto.bookingSlug !== existingProvider.bookingSlug) {
      const slugExists = await this.providerRepository.existsBySlug(
        dto.bookingSlug
      );

      if (slugExists) {
        throw new ConflictError('Booking slug already exists');
      }
    }

    if (dto.contactInfo?.phone && dto.contactInfo.phone !== existingProvider.contactInfo?.phone) {
      const phoneExists = await this.providerRepository.existsByContactPhone(
        dto.contactInfo.phone
      );

      if (phoneExists) {
        throw new ConflictError('Provider contact phone already exists');
      }
    }

    if (
      dto.contactInfo?.email &&
      dto.contactInfo.email !== existingProvider.contactInfo?.email
    ) {
      const emailExists = await this.providerRepository.existsByContactEmail(
        dto.contactInfo.email
      );

      if (emailExists) {
        throw new ConflictError('Provider contact email already exists');
      }
    }

    const updatedProvider = await this.providerRepository.updateById(id, dto);

    if (!updatedProvider) {
      throw new BadRequestError('Failed to update provider');
    }

    return this.toProviderResponseDto(updatedProvider);
  }

  async deactivateProvider(id: string): Promise<ProviderResponseDto> {
    const provider = await this.providerRepository.softDeactivateById(id);

    if (!provider) {
      throw new NotFoundError('Provider not found');
    }

    return this.toProviderResponseDto(provider);
  }

  private toProviderResponseDto(
    provider: ProviderDocument
  ): ProviderResponseDto {
    return {
      id: provider._id.toString(),
      displayName: provider.displayName,
      businessName: provider.businessName,
      providerType: provider.providerType,
      providerBusiness: provider.providerBusiness,
      bookingSlug: provider.bookingSlug,

      status: provider.status,
      isActive: provider.isActive,

      logoUrl: provider.logoUrl,
      bannerUrl: provider.bannerUrl,
      description: provider.description,
      website: provider.website,
      socialLinks: provider.socialLinks,

      contactInfo: provider.contactInfo,
      location: provider.location,

      timezone: provider.timezone,
      createdAt: provider.createdAt,
      updatedAt: provider.updatedAt,
    };
  }

  private toProviderPublicResponseDto(
    provider: ProviderDocument
  ): ProviderPublicResponseDto {
    return {
      displayName: provider.displayName,
      businessName: provider.businessName,
      providerType: provider.providerType,
      providerBusiness: provider.providerBusiness,
      bookingSlug: provider.bookingSlug,

      logoUrl: provider.logoUrl,
      bannerUrl: provider.bannerUrl,
      description: provider.description,
      website: provider.website,
      socialLinks: provider.socialLinks,

      contactInfo: provider.contactInfo
        ? {
            email: provider.contactInfo.email,
            phone: provider.contactInfo.phone,
          }
        : undefined,

      location: provider.location
        ? {
            city: provider.location.city,
            state: provider.location.state,
            country: provider.location.country,
          }
        : undefined,

      timezone: provider.timezone,
    };
  }
}