export interface ProviderWelcomeTemplateInput {
  displayName: string;
  bookingSlug: string;
}

export const buildProviderWelcomeTemplate = ({
  displayName,
  bookingSlug,
}: ProviderWelcomeTemplateInput) => {
  return {
    subject: 'Welcome to Appointment Platform',
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2>Welcome, ${displayName} 👋</h2>
        <p>Your provider profile has been created successfully.</p>
        <p>
          Your booking slug is:
          <strong>${bookingSlug}</strong>
        </p>
        <p>You can now continue setting up your booking system.</p>
      </div>
    `,
    text: `Welcome, ${displayName}. Your provider profile has been created successfully. Booking slug: ${bookingSlug}`,
  };
};