import { Response, Request, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import HttpError from 'http-errors';

export const registerValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    console.log(result)
    next(HttpError(400, result.array()[0].msg));
    return;
  }
  next();
};

export const sessionValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.user) {
    next(HttpError(401, 'Unauthorized'));
    return;
  }
  next();
};
