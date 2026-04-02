import { Request, Response } from 'express';
import { ProviderService } from './provider.service';
import { ApiResponse } from '../../common/responses/ApiResponse';
import { asyncHandler } from '../../common/utils/asyncHandler';
import {
  getSingleBoolean,
  getSingleNumber,
  getSingleString,
} from '../../common/utils/request.utils';
import { UnauthorizedError } from '../../common/errors';

export class ProviderController {
  private readonly providerService = new ProviderService();

  createProvider = asyncHandler(async (req: Request, res: Response) => {
    const provider = await this.providerService.createProvider(req.body);

    res
      .status(201)
      .json(ApiResponse.success(provider, 'Provider created successfully'));
  });

  getProviderById = asyncHandler(async (req: Request, res: Response) => {
    const id = getSingleString(req.params.id);

    const provider = await this.providerService.getProviderByIdWithAccess(id!, req.user!);

    res
      .status(200)
      .json(ApiResponse.success(provider, 'Provider fetched successfully'));
  });

  getProviderBySlug = asyncHandler(async (req: Request, res: Response) => {
    const slug = getSingleString(req.params.slug);

    const provider = await this.providerService.getProviderBySlug(slug!);

    res
      .status(200)
      .json(ApiResponse.success(provider, 'Provider fetched successfully'));
  });

  getPublicProviderBySlug = asyncHandler(
    async (req: Request, res: Response) => {
      const slug = getSingleString(req.params.slug);

      const provider = await this.providerService.getPublicProviderBySlug(slug!);

      res.status(200).json(
        ApiResponse.success(provider, 'Public provider fetched successfully')
      );
    }
  );

  getAllProviders = asyncHandler(async (req: Request, res: Response) => {
    const result = await this.providerService.getAllProviders({
      page: getSingleNumber(req.query.page as string | string[] | undefined),
      limit: getSingleNumber(req.query.limit as string | string[] | undefined),
      providerType: getSingleString(
        req.query.providerType as string | string[] | undefined
      ),
      status: getSingleString(
        req.query.status as string | string[] | undefined
      ),
      isActive: getSingleBoolean(
        req.query.isActive as string | string[] | undefined
      ),
    });

    res.status(200).json(
      ApiResponse.success(
        result.data,
        'Providers fetched successfully',
        result.meta
      )
    );
  });

  updateProvider = asyncHandler(async (req: Request, res: Response) => {
    const id = getSingleString(req.params.id);

    const provider = await this.providerService.updateProviderWithAccess(id!, req.body, req.user!);

    res
      .status(200)
      .json(ApiResponse.success(provider, 'Provider updated successfully'));
  });

  deactivateProvider = asyncHandler(async (req: Request, res: Response) => {
    const id = getSingleString(req.params.id);

    const provider = await this.providerService.deactivateProviderWithAccess(id!, req.user!);

    res
      .status(200)
      .json(ApiResponse.success(provider, 'Provider deactivated successfully'));
  });

  getMyProvider = asyncHandler(async (req: Request, res: Response) => {
    const authUserId = req.user?.sub;

    if (!authUserId) {
      throw new UnauthorizedError('Authentication required');
    }

    const provider = await this.providerService.getMyProvider(authUserId);

    res
      .status(200)
      .json(ApiResponse.success(provider, 'Provider profile fetched successfully'));
  });

  
}