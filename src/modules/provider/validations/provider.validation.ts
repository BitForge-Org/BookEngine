import { z } from 'zod';
import { ProviderBusiness } from '../../../common/enums/provider-business.enum';
import { ProviderStatus } from '../../../common/enums/provider-status.enum';
import { ProviderType } from '../../../common/enums/provider-type.enum';

const socialLinkSchema = z.object({
  platform: z.string().trim().min(1).max(50),
  url: z.string().trim().url(),
});

const contactInfoSchema = z.object({
  email: z.string().trim().email().optional(),
  phone: z.string().trim().min(7).max(20).optional(),
});

const locationSchema = z.object({
  address: z.string().trim().max(255).optional(),
  city: z.string().trim().max(100).optional(),
  state: z.string().trim().max(100).optional(),
  zip: z.string().trim().max(20).optional(),
  country: z.string().trim().max(100).optional(),
});

export const createProviderSchema = z.object({
  displayName: z.string().trim().min(2).max(100),
  businessName: z.string().trim().max(150).optional(),
  providerType: z.nativeEnum(ProviderType),
  providerBusiness: z.nativeEnum(ProviderBusiness),
  bookingSlug: z
    .string()
    .trim()
    .toLowerCase()
    .min(3)
    .max(80)
    .regex(/^[a-z0-9-]+$/, 'Booking slug must contain only lowercase letters, numbers, and hyphens'),

  logoUrl: z.string().trim().url().optional(),
  bannerUrl: z.string().trim().url().optional(),
  description: z.string().trim().max(1000).optional(),
  website: z.string().trim().url().optional(),
  socialLinks: z.array(socialLinkSchema).optional(),

  contactInfo: contactInfoSchema.optional(),
  location: locationSchema.optional(),

  timezone: z.string().trim().min(1).max(100),
});

export const updateProviderSchema = z.object({
  displayName: z.string().trim().min(2).max(100).optional(),
  businessName: z.string().trim().max(150).optional(),
  providerType: z.nativeEnum(ProviderType).optional(),
  providerBusiness: z.nativeEnum(ProviderBusiness).optional(),
  bookingSlug: z
    .string()
    .trim()
    .toLowerCase()
    .min(3)
    .max(80)
    .regex(/^[a-z0-9-]+$/, 'Booking slug must contain only lowercase letters, numbers, and hyphens')
    .optional(),

  logoUrl: z.string().trim().url().optional(),
  bannerUrl: z.string().trim().url().optional(),
  description: z.string().trim().max(1000).optional(),
  website: z.string().trim().url().optional(),
  socialLinks: z.array(socialLinkSchema).optional(),

  contactInfo: contactInfoSchema.optional(),
  location: locationSchema.optional(),

  timezone: z.string().trim().min(1).max(100).optional(),
});

export const providerIdParamSchema = z.object({
  id: z.string().trim().min(1, 'Provider id is required'),
});

export const providerSlugParamSchema = z.object({
  slug: z.string().trim().min(1, 'Provider slug is required'),
});

export const providerListQuerySchema = z.object({
  page: z.coerce.number().int().min(1).optional(),
  limit: z.coerce.number().int().min(1).max(50).optional(),
  providerType: z.nativeEnum(ProviderType).optional(),
  status: z.nativeEnum(ProviderStatus).optional(),
  isActive: z.coerce.boolean().optional(),
});