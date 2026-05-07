import { z } from 'zod';
import { ServicePaymentMode } from '../../../common/enums/service-payment-mode.enums';
import { ServicePaymentTiming } from '../../../common/enums/service-payment-timing';

// =========================
// Shared Validators
// =========================

const objectIdSchema = z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid MongoDB ObjectId');

const imageUrlSchema = z.string().url('Each image must be a valid URL');

const bookingPolicySchema = z
  .object({
    confirmationType: z.enum(['auto', 'manual']).optional(),

    holdSlotMinutes: z.number().int().min(0).optional(),

    allowCustomerCancellation: z.boolean().optional(),
    allowProviderCancellation: z.boolean().optional(),
    cancellationWindowHours: z.number().int().min(0).optional(),

    allowCustomerReschedule: z.boolean().optional(),
    allowProviderReschedule: z.boolean().optional(),
    rescheduleWindowHours: z.number().int().min(0).optional(),

    paymentMode: z.nativeEnum(ServicePaymentMode).optional(),
    paymentTiming: z.nativeEnum(ServicePaymentTiming).optional(),

    minAdvanceBookingHours: z.number().int().min(0).optional(),
    maxAdvanceBookingDays: z.number().int().min(1).optional(),
  })
  .superRefine((data, ctx) => {
    // =========================
    // Payment consistency
    // =========================

    if (data.paymentMode === ServicePaymentMode.None) {
      if (
        data.paymentTiming &&
        data.paymentTiming !== ServicePaymentTiming.None
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['paymentTiming'],
          message:
            'paymentTiming must be "none" when paymentMode is "none"',
        });
      }
    }

    if (
      data.paymentMode &&
      data.paymentMode !== ServicePaymentMode.None &&
      data.paymentTiming === ServicePaymentTiming.None
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['paymentTiming'],
        message:
          'paymentTiming cannot be "none" when paymentMode supports payments',
      });
    }

    // =========================
    // Cancellation sanity
    // =========================

    if (
      data.allowCustomerCancellation === false &&
      typeof data.cancellationWindowHours === 'number'
    ) {
      // Not invalid enough to reject, but could still be accepted.
      // Leaving as valid for flexibility.
    }

    // =========================
    // Reschedule sanity
    // =========================

    if (
      data.allowCustomerReschedule === false &&
      typeof data.rescheduleWindowHours === 'number'
    ) {
      // Also acceptable, not strictly invalid.
    }
  });

// =========================
// Create Service
// =========================

export const createServiceSchema = z
  .object({
    providerId: objectIdSchema,

    name: z.string().trim().min(2).max(120),

    slug: z
      .string()
      .trim()
      .toLowerCase()
      .min(3)
      .max(80)
      .regex(/^[a-z0-9-]+$/, 'Slug must contain only lowercase letters, numbers, and hyphens'),

    description: z.string().trim().max(2000).optional(),

    images: z.array(imageUrlSchema).max(10).optional(),

    price: z.number().min(0).optional(),

    currency: z
      .string()
      .trim()
      .toUpperCase()
      .length(3, 'Currency must be a 3-letter ISO code')
      .optional(),

    durationMinutes: z.number().int().min(5).max(1440),

    bufferMinutes: z.number().int().min(0).max(1440).optional(),

    isOnlineBookable: z.boolean().optional(),

    bookingPolicy: bookingPolicySchema.optional(),
  })
  .superRefine((data, ctx) => {
    // =========================
    // Price / Currency consistency
    // =========================

    if (typeof data.price === 'number' && !data.currency) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['currency'],
        message: 'currency is required when price is provided',
      });
    }

    if (data.currency && typeof data.price !== 'number') {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['price'],
        message: 'price is required when currency is provided',
      });
    }
  });

// =========================
// Update Service
// =========================

export const updateServiceSchema = z
  .object({
    name: z.string().trim().min(2).max(120).optional(),

    slug: z
      .string()
      .trim()
      .toLowerCase()
      .min(3)
      .max(80)
      .regex(/^[a-z0-9-]+$/, 'Slug must contain only lowercase letters, numbers, and hyphens')
      .optional(),

    description: z.string().trim().max(2000).optional(),

    images: z.array(imageUrlSchema).max(10).optional(),

    price: z.number().min(0).optional(),

    currency: z
      .string()
      .trim()
      .toUpperCase()
      .length(3, 'Currency must be a 3-letter ISO code')
      .optional(),

    durationMinutes: z.number().int().min(5).max(1440).optional(),

    bufferMinutes: z.number().int().min(0).max(1440).optional(),

    isActive: z.boolean().optional(),
    isOnlineBookable: z.boolean().optional(),

    bookingPolicy: bookingPolicySchema.optional(),
  })
  .superRefine((data, ctx) => {
    // Only validate pair if one of them is being updated
    const hasPrice = Object.prototype.hasOwnProperty.call(data, 'price');
    const hasCurrency = Object.prototype.hasOwnProperty.call(data, 'currency');

    if (hasPrice && data.price !== undefined && !hasCurrency && data.price !== undefined) {
      // allow partial update
    }

    if (hasCurrency && data.currency !== undefined && !hasPrice) {
      // allow partial update
    }
  });

// =========================
// List Services Query
// =========================

export const getServicesQuerySchema = z.object({
  providerId: objectIdSchema.optional(),

  search: z.string().trim().optional(),

  isActive: z
    .enum(['true', 'false'])
    .transform((val) => val === 'true')
    .optional(),

  isOnlineBookable: z
    .enum(['true', 'false'])
    .transform((val) => val === 'true')
    .optional(),

  page: z
    .string()
    .optional()
    .transform((val) => (val ? parseInt(val, 10) : 1))
    .refine((val) => val > 0, {
      message: 'page must be greater than 0',
    }),

  limit: z
    .string()
    .optional()
    .transform((val) => (val ? parseInt(val, 10) : 10))
    .refine((val) => val > 0 && val <= 100, {
      message: 'limit must be between 1 and 100',
    }),
});

// =========================
// Params
// =========================

export const serviceIdParamSchema = z.object({
  providerId: objectIdSchema,
  serviceId: objectIdSchema,
});

export const providerIdParamSchema = z.object({
  providerId: objectIdSchema,
});