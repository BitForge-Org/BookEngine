import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { ApiResponse } from '../../common/responses/ApiResponse';
import { asyncHandler } from '../../common/utils/asyncHandler';
import jwt, { JwtPayload } from 'jsonwebtoken';

export class AuthController {
  private readonly authService = new AuthService();

  setupAccount = asyncHandler(async (req: Request, res: Response) => {
    const result = await this.authService.setupAccount(req.body);

    res
      .status(200)
      .json(ApiResponse.success(result, 'Account setup completed successfully'));
  });

  login = asyncHandler(async (req: Request, res: Response) => {
    const result = await this.authService.login(req.body);

    res.status(200)
    .cookie('accessToken',result.accessToken ,this.getCookieOptions(result.accessToken) )
    .json(ApiResponse.success(result, 'Login successful'));
  });


 private getCookieOptions(token: string) {
    let expires;

    try {
      const decoded = jwt.decode(token) as JwtPayload | null;
      if (decoded?.exp) {
        expires = new Date(decoded.exp * 1000);
      }
    } catch {
      expires = undefined;
    }

    return {
      httpOnly: true, // better for security
      secure: false,  // true in production with HTTPS
      sameSite: 'lax' as const,
      ...(expires && { expires }),
    };
  }
}