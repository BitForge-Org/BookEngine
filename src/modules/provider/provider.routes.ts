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
import {
  authenticate,
  authorizeRoles,
} from '../../common/middlewares';

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
  authenticate,
  authorizeRoles('admin'),
  validate(providerListQuerySchema, 'query'),
  providerController.getAllProviders
);

router.get(
  '/slug/:slug',
  validate(providerSlugParamSchema, 'params'),
  providerController.getProviderBySlug
);

router.get(
  '/me',
  authenticate,
  authorizeRoles('provider'),
  providerController.getMyProvider
);

router.get(
  '/:id',
  validate(providerIdParamSchema, 'params'),
  providerController.getProviderById
);

router.patch(
  '/:id',
  authenticate,
  authorizeRoles('provider','admin'),
  validate(providerIdParamSchema, 'params'),
  validate(updateProviderSchema, 'body'),
  providerController.updateProvider
);

router.patch(
  '/:id/deactivate',
  authenticate,
  authorizeRoles('admin','admin'),
  validate(providerIdParamSchema, 'params'),
  providerController.deactivateProvider
);




export default router;