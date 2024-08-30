import { NextFunction, Request, Response } from 'express';
import Token from '../utils/jwt';

export const authMiddleware = (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
    return {
      status: 401,
      message: 'Invalid token',
    };
  }

  const token = authorizationHeader.split(' ')[1];

  const tokenInstance = new Token();
  const decoded = tokenInstance.validateToken(token);

  if (decoded) {
    req.user = {
      id: decoded,
    };
  }

  next();
};
