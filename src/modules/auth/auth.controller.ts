import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { ApiResponse } from '../../common/responses/ApiResponse';
import { asyncHandler } from '../../common/utils/asyncHandler';

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

    res.status(200).json(ApiResponse.success(result, 'Login successful'));
  });
}