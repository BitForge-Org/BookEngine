import { ConflictError, NotFoundError } from "../../common/errors";
import { UnauthorizedError } from "../../common/errors/UnauthorizedError";
import { ProviderRepository } from "../provider/provider.repository";
import { AuthRepository } from "./auth.repository";
import { SetupAccountDto } from "./dto/setup-account.dto";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import env from '../../config/env';
import { notificationService } from "../../notifications";
import logger from "../../config/logger";

export class AuthService  {
    private readonly authRepository = new AuthRepository();
    private readonly providerRepository = new ProviderRepository();

    async setupAccount(dto: SetupAccountDto) {
        const { token, password } = dto;
        const setupToken = await this.authRepository.findValidSetupToken(token);
        if (!setupToken) {
            throw new UnauthorizedError('Invalid or expired setup token');
        }
        
        const email = setupToken.email.trim().toLowerCase();
        const existingUser = await this.authRepository.findByEmail(email);
        if (existingUser) {
           throw new ConflictError('User already exists');
        }

       const passwordHash = await bcrypt.hash(password, 10);

       const user = await this.authRepository.create({
           email ,
           passwordHash,
           role: 'provider',
           isEmailVerified: true,
       });

       const updatedProvider = await this.providerRepository.assignOwnerAndActivate(
        setupToken.providerId.toString(),
        user._id.toString()
        );

        if (!updatedProvider) {
        throw new NotFoundError('Provider not found for setup token');
        }

        await this.authRepository.markSetupTokenAsUsed(setupToken._id.toString());

        
         notificationService
        .sendProviderWelcomeEmail({
          to: email,
          displayName: updatedProvider.displayName,
          bookingSlug: updatedProvider.bookingSlug,
        })
        .catch((error) => {
          logger.error('❌ Failed to send provider welcome email', {
            providerId: updatedProvider._id?.toString(),
            email: updatedProvider.contactInfo?.email,
            error,
          });
        });

        return {
        message: 'Account setup completed successfully',
        providerId: updatedProvider._id.toString(),
        userId: user._id.toString(),
        };
      
    }

    async login(dtp :{email:string,password:string}){
     const email = dtp.email.trim().toLowerCase();
     const user = await this.authRepository.findByEmail(email);
     if(!user || !user.passwordHash){
        throw new UnauthorizedError('Invalid credentials');
     }
     const isPasswordValid = await bcrypt.compare(dtp.password, user.passwordHash);
     if(!isPasswordValid){
        throw new UnauthorizedError('Invalid credentials');
     }
     const accessToken = jwt.sign(
        {
            sub: user._id.toString(),
            role: user.role,
        },
        env.JWT_SECRET!,
        {
            expiresIn: env.JWT_EXPIRES_IN as any,
        }
        );

        await this.authRepository.updateLastLogin(user._id.toString());

     return {
     accessToken,
     };


    }

    generateSetupToken(): string {
    return crypto.randomBytes(32).toString('hex');
    }

    
}