import { Router } from 'express';
import { AuthController } from './auth.controller';
import { validate } from '../../common/middlewares/validate.middleware';
import {
  loginSchema,
  setupAccountSchema,
} from './validations/auth.validation';

const router = Router();
const authController = new AuthController();

router.post(
  '/setup-account',
  validate(setupAccountSchema, 'body'),
  authController.setupAccount
);

router.post('/login', validate(loginSchema, 'body'), authController.login);

export default router;