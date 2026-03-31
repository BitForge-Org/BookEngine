export interface SendProviderWelcomeEmailInput {
  to: string;
  displayName: string;
  bookingSlug: string;
}

export interface SendAppointmentBookedEmailInput {
  to: string;
  providerName: string;
  customerName: string;
  serviceName: string;
  appointmentDate: string;
  appointmentTime: string;
}