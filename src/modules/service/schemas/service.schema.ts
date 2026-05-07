import mongoose, { Schema } from 'mongoose';
import {
  ServiceBookingPolicy,
  ServiceDocument,
} from '../interfaces/service.interface';
import { ServicePaymentMode } from '../../../common/enums/service-payment-mode.enums';
import { ServicePaymentTiming } from '../../../common/enums/service-payment-timing';

const BookingPolicySchema = new Schema<ServiceBookingPolicy>(
  {
    confirmationType: {
      type: String,
      enum: ['auto', 'manual'],
      required: true,
      default: 'auto',
    },

    holdSlotMinutes: {
      type: Number,
      required: true,
      default: 10,
      min: 0,
    },

    allowCustomerCancellation: {
      type: Boolean,
      required: true,
      default: true,
    },

    allowProviderCancellation: {
      type: Boolean,
      required: true,
      default: true,
    },

    cancellationWindowHours: {
      type: Number,
      required: true,
      default: 24,
      min: 0,
    },

    allowCustomerReschedule: {
      type: Boolean,
      required: true,
      default: true,
    },

    allowProviderReschedule: {
      type: Boolean,
      required: true,
      default: true,
    },

    rescheduleWindowHours: {
      type: Number,
      required: true,
      default: 24,
      min: 0,
    },

    paymentMode: {
      type: String,
      enum: Object.values(ServicePaymentMode),
      required: true,
      default: ServicePaymentMode.None,
    },

    paymentTiming: {
      type: String,
      enum: Object.values(ServicePaymentTiming),
      required: true,
      default: ServicePaymentTiming.None,
    },

    minAdvanceBookingHours: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },

    maxAdvanceBookingDays: {
      type: Number,
      required: true,
      default: 30,
      min: 1,
    },
  },
  { _id: false }
);

const ServiceSchema = new Schema<ServiceDocument>(
  {
    providerId: {
      type: Schema.Types.ObjectId,
      ref: 'Provider',
      required: true,
      index: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 120,
    },

    slug: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      minlength: 3,
      maxlength: 80,
      match: /^[a-z0-9-]+$/,
    },

    description: {
      type: String,
      trim: true,
      maxlength: 2000,
    },

    images: {
      type: [String],
      default: [],
    },

    price: {
      type: Number,
      min: 0,
    },

    currency: {
      type: String,
      trim: true,
      uppercase: true,
      default: 'INR',
      minlength: 3,
      maxlength: 3,
    },

    durationMinutes: {
      type: Number,
      required: true,
      min: 5,
      max: 1440,
    },

    bufferMinutes: {
      type: Number,
      default: 0,
      min: 0,
      max: 1440,
    },

    bookingPolicy: {
      type: BookingPolicySchema,
      required: true,
      default: () => ({}),
    },

    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },

    isOnlineBookable: {
      type: Boolean,
      default: true,
      index: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// Unique service slug per provider
ServiceSchema.index({ providerId: 1, slug: 1 }, { unique: true });

// Optional uniqueness for name per provider
ServiceSchema.index({ providerId: 1, name: 1 }, { unique: true });

// Helpful filters
ServiceSchema.index({ providerId: 1, isActive: 1 });
ServiceSchema.index({ providerId: 1, isOnlineBookable: 1 });

export const ServiceModel = mongoose.model<ServiceDocument>(
  'Service',
  ServiceSchema
);