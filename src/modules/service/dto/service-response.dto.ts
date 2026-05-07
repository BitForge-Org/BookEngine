import { ServicePaymentMode } from '../../../common/enums/service-payment-mode.enums';
import { ServicePaymentTiming } from '../../../common/enums/service-payment-timing';
import { ServiceConfirmationType } from './create-service.dto';

export interface ServiceBookingPolicyResponseDto {
  confirmationType: ServiceConfirmationType;

  holdSlotMinutes: number;

  allowCustomerCancellation: boolean;
  allowProviderCancellation: boolean;
  cancellationWindowHours: number;

  allowCustomerReschedule: boolean;
  allowProviderReschedule: boolean;
  rescheduleWindowHours: number;

  paymentMode: ServicePaymentMode;
  paymentTiming: ServicePaymentTiming;

  minAdvanceBookingHours: number;
  maxAdvanceBookingDays: number;
}

export interface ServiceResponseDto {
  id: string;
  providerId: string;

  name: string;
  slug: string;
  description?: string;
  images: string[];

  price?: number;
  currency?: string;

  durationMinutes: number;
  bufferMinutes: number;

  isActive: boolean;
  isOnlineBookable: boolean;

  bookingPolicy: ServiceBookingPolicyResponseDto;

  createdAt: Date;
  updatedAt: Date;
}
