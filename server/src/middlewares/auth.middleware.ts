import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import IError from '../interfaces/IError';

declare global {
    namespace Express {
        export interface Request {
            user: any;
        }
    }
}

const Auth = (req: Request, res: Response, next: NextFunction) => {
    try {
        const { token } = req.cookies;
        if (!token) {
            throw { code: 403, message: 'You are not Authenticated' };
        }
        jwt.verify(token as string, process.env.JWT_SECRET!, (err, user) => {
            if (err) {
                throw { code: 403, message: 'Token is not valid!' };
            }
            req.user = user;
            next();
        }) as any;
    } catch (error) {
        const typedError = error as IError;
        res.status(typedError.code).json({ message: typedError.message });
    }
};

export { Auth };
