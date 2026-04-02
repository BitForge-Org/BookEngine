import { FilterQuery, Types, UpdateQuery } from 'mongoose';
import { ProviderModel } from './schemas/provider.schema';
import {
  Provider,
  ProviderDocument,
} from './interfaces/provider.interface';

export class ProviderRepository {
  async create(payload: Provider): Promise<ProviderDocument> {
    return ProviderModel.create(payload);
  }

  async findById(id: string): Promise<ProviderDocument | null> {
    if (!Types.ObjectId.isValid(id)) {
      return null;
    }

    return ProviderModel.findById(id).exec();
  }

  async findBySlug(bookingSlug: string): Promise<ProviderDocument | null> {
    return ProviderModel.findOne({ bookingSlug }).exec();
  }

  async findByContactEmail(email: string): Promise<ProviderDocument | null> {
    return ProviderModel.findOne({
      'contactInfo.email': email.toLowerCase(),
    }).exec();
  }

  async findByContactPhone(phone: string): Promise<ProviderDocument | null> {
    return ProviderModel.findOne({
      'contactInfo.phone': phone,
    }).exec();
  }

  async findAll(
    filter: FilterQuery<ProviderDocument> = {}
  ): Promise<ProviderDocument[]> {
    return ProviderModel.find(filter)
      .sort({ createdAt: -1 })
      .exec();
  }

  async updateById(
    id: string,
    payload: UpdateQuery<Provider>
  ): Promise<ProviderDocument | null> {
    if (!Types.ObjectId.isValid(id)) {
      return null;
    }

    return ProviderModel.findByIdAndUpdate(id, payload, {
      new: true,
      runValidators: true,
    }).exec();
  }

  async existsBySlug(bookingSlug: string): Promise<boolean> {
    const exists = await ProviderModel.exists({ bookingSlug });
    return Boolean(exists);
  }

  async existsByContactEmail(email: string): Promise<boolean> {
    const exists = await ProviderModel.exists({
      'contactInfo.email': email.toLowerCase(),
    });
    return Boolean(exists);
  }

  async existsByContactPhone(phone: string): Promise<boolean> {
    const exists = await ProviderModel.exists({
      'contactInfo.phone': phone,
    });
    return Boolean(exists);
  }

  async softDeactivateById(id: string): Promise<ProviderDocument | null> {
    if (!Types.ObjectId.isValid(id)) {
      return null;
    }

    return ProviderModel.findByIdAndUpdate(
      id,
      {
        isActive: false,
      },
      {
        new: true,
        runValidators: true,
      }
    ).exec();
  }

  async findPaginated(
    filter: any,
    page: number,
    limit: number
    ): Promise<{
      data: ProviderDocument[];
      total: number;
    }> {
      const skip = (page - 1) * limit;

      const [data, total] = await Promise.all([
        ProviderModel.find(filter)
          .sort({ createdAt: -1 })
          .skip(skip)
          .limit(limit)
          .exec(),

        ProviderModel.countDocuments(filter),
      ]);

      return { data, total };
  }

    async assignOwnerAndActivate(providerId: string, ownerId: string) {
    return ProviderModel.findByIdAndUpdate(
      providerId,
      {
        ownerId,
        status: 'active',
        isActive: true,
      },
      { new: true }
    );
  }
}