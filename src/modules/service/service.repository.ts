import { FilterQuery, Types } from 'mongoose';
import { ServiceModel } from './schemas/service.schema';
import { ServiceDocument } from './interfaces/service.interface';

export class ServiceRepository {


  async create(data: Partial<ServiceDocument>): Promise<ServiceDocument> {
    return ServiceModel.create(data);
  }


  async findById(id: string): Promise<ServiceDocument | null> {
    return ServiceModel.findById(id);
  }

  async findByIdAndProvider(
    serviceId: string,
    providerId: string
  ): Promise<ServiceDocument | null> {
    return ServiceModel.findOne({
      _id: serviceId,
      providerId: new Types.ObjectId(providerId),
    });
  }

  async findBySlug(
    providerId: string,
    slug: string
  ): Promise<ServiceDocument | null> {
    return ServiceModel.findOne({
      providerId: new Types.ObjectId(providerId),
      slug,
    });
  }


  async existsBySlug(providerId: string, slug: string): Promise<boolean> {
    const exists = await ServiceModel.exists({
      providerId: new Types.ObjectId(providerId),
      slug,
    });
    return !!exists;
  }

  async existsByName(providerId: string, name: string): Promise<boolean> {
    const exists = await ServiceModel.exists({
      providerId: new Types.ObjectId(providerId),
      name,
    });
    return !!exists;
  }



  async findMany(
    filter: FilterQuery<ServiceDocument>,
    options: {
      skip?: number;
      limit?: number;
      sort?: any;
    } = {}
  ): Promise<ServiceDocument[]> {
    const { skip = 0, limit = 10, sort = { createdAt: -1 } } = options;

    return ServiceModel.find(filter)
      .skip(skip)
      .limit(limit)
      .sort(sort);
  }

  async count(filter: FilterQuery<ServiceDocument>): Promise<number> {
    return ServiceModel.countDocuments(filter);
  }


  async updateById(
    id: string,
    update: Partial<ServiceDocument>
  ): Promise<ServiceDocument | null> {
    return ServiceModel.findByIdAndUpdate(id, update, { new: true });
  }


  async softDeactivate(id: string): Promise<ServiceDocument | null> {
    return ServiceModel.findByIdAndUpdate(
      id,
      { isActive: false },
      { new: true }
    );
  }
}