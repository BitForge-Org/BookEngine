import { Request, Response, NextFunction } from "express";
import { UnauthorizedError } from "../errors/UnauthorizedError";
import jwt from "jsonwebtoken";
import env from "../../config/env";
import { JwtUserPayload } from "../../modules/auth/auth.types";
import logger from "../../config/logger";

export const authenticate = (
  req: Request,
  _res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers.authorization;

  let token: string | undefined;

  if (authHeader?.startsWith("Bearer ")) {
    token = authHeader.split(" ")[1];
  } else if (req.cookies?.accessToken) {
    token = req.cookies.accessToken;
  }

  logger.info("Auth check", {
    hasAuthorizationHeader: !!authHeader,
    hasCookieToken: !!req.cookies?.accessToken,
  });

  if (!token) {
    return next(new UnauthorizedError("Unauthorized"));
  }

  try {
    const decodedToken = jwt.verify(token, env.JWT_SECRET) as JwtUserPayload;

    if (!decodedToken?.sub || !decodedToken?.role) {
      return next(new UnauthorizedError("Invalid token payload"));
    }

    req.user = {
      sub: decodedToken.sub,
      role: decodedToken.role,
    };

    next();
  } catch (error) {
    logger.error("JWT verification failed", error);
    return next(new UnauthorizedError("Invalid token"));
  }
};