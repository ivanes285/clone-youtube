import { Request, Response, NextFunction } from 'express';
import IError from '../interfaces/IError';
import jwt from 'jsonwebtoken';

declare global {
    namespace Express {
      export interface Request {
        session: { id: string;};
      }
    }
  }

function checkAuth(req: Request, res: Response, next: NextFunction): void {
    try {
        const { token } = req.headers;
        if (!token) {
            throw {
                code: 404,
                message: 'You are not Authorized'
            };
        }
        const { id } = jwt.verify(
            token as string,
            process.env.JWT_SECRET!
        ) as any;
        req.session = { id };
        next();
    } catch (error) {
        const typedError = error as IError;
        res.status(typedError.code).json({ message: typedError.message });
    }
}
