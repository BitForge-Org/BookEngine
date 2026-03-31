export interface AppointmentBookedTemplateInput {
  providerName: string;
  customerName: string;
  serviceName: string;
  appointmentDate: string;
  appointmentTime: string;
}

export const buildAppointmentBookedTemplate = ({
  providerName,
  customerName,
  serviceName,
  appointmentDate,
  appointmentTime,
}: AppointmentBookedTemplateInput) => {
  return {
    subject: 'New Appointment Booked',
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2>New Appointment Booked</h2>
        <p>Hello ${providerName},</p>
        <p>A new appointment has been booked.</p>
        <ul>
          <li><strong>Customer:</strong> ${customerName}</li>
          <li><strong>Service:</strong> ${serviceName}</li>
          <li><strong>Date:</strong> ${appointmentDate}</li>
          <li><strong>Time:</strong> ${appointmentTime}</li>
        </ul>
      </div>
    `,
    text: `New appointment booked. Customer: ${customerName}, Service: ${serviceName}, Date: ${appointmentDate}, Time: ${appointmentTime}`,
  };
};