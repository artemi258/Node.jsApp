import { NextFunction, Request, Response } from 'express';
import { IMiddleware } from './middleware.interface';

export class GuardMiddleware implements IMiddleware {
	excute({ user }: Request, res: Response, next: NextFunction): void {
		if (user) {
			return next();
		}
		res.status(401).send('Пользователь не авторизован!');
	}
}
