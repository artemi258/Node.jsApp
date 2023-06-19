import { inject, injectable } from 'inversify';
import { BaseController } from '../common/base.controller';
import { IControllerRoute } from '../common/route.interface';
import { HTTPError } from '../errors/http-error.class';
import { NextFunction, Request, Response } from 'express';
import { ILogger } from '../logger/logger.interface';
import { TYPES } from '../types';
import { IUsersController } from './users.interface';

class User {}
const arr = [];

@injectable()
export class UserController extends BaseController implements IUsersController {
	userRouter: IControllerRoute[] = [
		{
			path: '/login',
			func: this.login,
			method: 'post',
		},
		{
			path: '/register',
			func: this.register,
			method: 'post',
		},
	];

	constructor(@inject(TYPES.ILogger) private loggerService: ILogger) {
		super(loggerService);
		this.bindRoutes(this.userRouter);
	}

	login(req: Request, res: Response, next: NextFunction): void {
		arr.push(new User());
		// this.ok(res, "login");
		next(new HTTPError(401, 'ошибка авторизации'));
	}
	register(req: Request, res: Response, next: NextFunction): void {
		this.ok(res, 'register');
	}
}
