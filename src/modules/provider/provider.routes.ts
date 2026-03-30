import { Router } from 'express';
import { ProviderController } from './provider.controller';
import { validate } from '../../common/middlewares/validate.middleware';
import {
  createProviderSchema,
  providerIdParamSchema,
  providerListQuerySchema,
  providerSlugParamSchema,
  updateProviderSchema,
} from './validations/provider.validation';

const router = Router();
const providerController = new ProviderController();

/**
 * Public Routes
 */
router.get(
  '/public/:slug',
  validate(providerSlugParamSchema, 'params'),
  providerController.getPublicProviderBySlug
);

/**
 * Internal / Protected-ready Routes
 */
router.post(
  '/',
  validate(createProviderSchema, 'body'),
  providerController.createProvider
);

router.get(
  '/',
  validate(providerListQuerySchema, 'query'),
  providerController.getAllProviders
);

router.get(
  '/slug/:slug',
  validate(providerSlugParamSchema, 'params'),
  providerController.getProviderBySlug
);

router.get(
  '/:id',
  validate(providerIdParamSchema, 'params'),
  providerController.getProviderById
);

router.patch(
  '/:id',
  validate(providerIdParamSchema, 'params'),
  validate(updateProviderSchema, 'body'),
  providerController.updateProvider
);

router.patch(
  '/:id/deactivate',
  validate(providerIdParamSchema, 'params'),
  providerController.deactivateProvider
);

export default router;