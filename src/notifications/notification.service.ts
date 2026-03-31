import logger from '../config/logger';
import { mailService } from '../common/mail';
import {
  buildAppointmentBookedTemplate,
  buildProviderWelcomeTemplate,
} from '../common/mail/templates';
import {
  SendAppointmentBookedEmailInput,
  SendProviderWelcomeEmailInput,
} from './notification.types';

class NotificationService {
  async sendProviderWelcomeEmail(
    payload: SendProviderWelcomeEmailInput
  ): Promise<void> {
    try {
      const template = buildProviderWelcomeTemplate({
        displayName: payload.displayName,
        bookingSlug: payload.bookingSlug,
      });

      await mailService.sendMail({
        to: payload.to,
        subject: template.subject,
        html: template.html,
        text: template.text,
      });

      logger.info('📨 Provider welcome email sent', {
        to: payload.to,
      });
    } catch (error) {
      logger.error('❌ Failed to send provider welcome email', {
        to: payload.to,
        error,
      });

      throw error;
    }
  }

  async sendAppointmentBookedEmail(
    payload: SendAppointmentBookedEmailInput
  ): Promise<void> {
    try {
      const template = buildAppointmentBookedTemplate({
        providerName: payload.providerName,
        customerName: payload.customerName,
        serviceName: payload.serviceName,
        appointmentDate: payload.appointmentDate,
        appointmentTime: payload.appointmentTime,
      });

      await mailService.sendMail({
        to: payload.to,
        subject: template.subject,
        html: template.html,
        text: template.text,
      });

      logger.info('📨 Appointment booked email sent', {
        to: payload.to,
      });
    } catch (error) {
      logger.error('❌ Failed to send appointment booked email', {
        to: payload.to,
        error,
      });

      throw error;
    }
  }
}

export const notificationService = new NotificationService();