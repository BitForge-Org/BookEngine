export interface ProviderSetupTemplateInput {
  displayName: string;
  setupLink: string;
}

export const buildProviderSetupTemplate = ({
  displayName,
  setupLink,
}: ProviderSetupTemplateInput) => {
  return {
    subject: 'Complete Your Account Setup',
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2>Hello ${displayName} 👋</h2>
        <p>Your provider profile has been created successfully.</p>
        <p>Please complete your account setup by clicking the button below:</p>
        <p>
          <a 
            href="${setupLink}" 
            style="
              display: inline-block;
              padding: 12px 20px;
              background-color: #111827;
              color: #ffffff;
              text-decoration: none;
              border-radius: 6px;
            "
          >
            Complete Setup
          </a>
        </p>
        <p>If the button does not work, use this link:</p>
        <p>${setupLink}</p>
        <p>This link will expire in 24 hours.</p>
      </div>
    `,
    text: `Hello ${displayName}, complete your account setup using this link: ${setupLink}`,
  };
};