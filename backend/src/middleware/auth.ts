import { Response, Request, NextFunction } from 'express';
import { validationResult } from 'express-validator';

export const registerValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    res.status(400).json({ errors: result.array()[0] });
    return;
  }
  next();
};
