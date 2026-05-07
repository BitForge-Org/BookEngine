import { Types , Document} from "mongoose";
import { ServicePaymentMode } from "../../../common/enums/service-payment-mode.enums";
import { ServicePaymentTiming } from "../../../common/enums/service-payment-timing";

export type ServiceConfirmationType = 'auto' | 'manual';

export interface ServiceBookingPolicy{
    confirmationType: ServiceConfirmationType;
    holdSlotMinutes: number;
    
    allowCustomerCancellation: boolean;
    allowProviderCancellation : boolean;
    cancellationWindowHours : number;
    
    allowCustomerReschedule: boolean;
    allowProviderReschedule: boolean;
    rescheduleWindowHours: number;

    paymentMode: ServicePaymentMode;
    paymentTiming: ServicePaymentTiming;

    minAdvanceBookingHours: number;
    maxAdvanceBookingDays: number;
    
}

export interface ServiceDocument extends Document {
    providerId: Types.ObjectId;

    name: string;
    slug : string;
    description: string;
    images?: string[];

    price?: number;
    currency?: string;

    durationMinutes: number;
    bufferMinutes?: number;

    bookingPolicy: ServiceBookingPolicy;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    isOnlineBookable : boolean;
}