import { ServicePaymentMode } from '../../../common/enums/service-payment-mode.enums';
import { ServicePaymentTiming } from '../../../common/enums/service-payment-timing';
import { ServiceConfirmationType } from './create-service.dto';

export interface UpdateServiceBookingPolicyDto {
  confirmationType?: ServiceConfirmationType;

  holdSlotMinutes?: number;

  allowCustomerCancellation?: boolean;
  allowProviderCancellation?: boolean;
  cancellationWindowHours?: number;

  allowCustomerReschedule?: boolean;
  allowProviderReschedule?: boolean;
  rescheduleWindowHours?: number;

  paymentMode?: ServicePaymentMode;
  paymentTiming?: ServicePaymentTiming;

  minAdvanceBookingHours?: number;
  maxAdvanceBookingDays?: number;
}

export interface UpdateServiceDto {
  name?: string;
  slug?: string;
  description?: string;
  images?: string[];

  price?: number;
  currency?: string;

  durationMinutes?: number;
  bufferMinutes?: number;

  isActive?: boolean;
  isOnlineBookable?: boolean;

  bookingPolicy?: UpdateServiceBookingPolicyDto;
}
