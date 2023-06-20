import { UserService } from './users.service';
import { inject, injectable } from 'inversify';
import { BaseController } from '../common/base.controller';
import { IControllerRoute } from '../common/route.interface';
import { HTTPError } from '../errors/http-error.class';
import { NextFunction, Request, Response } from 'express';
import { ILogger } from '../logger/logger.interface';
import { TYPES } from '../types';
import { IUsersController } from './users.interface';
import { UserLoginDto } from './dto/user-login.dto';
import { UserRegisterDto } from './dto/user-register.dto';
import { ValidateMiddleware } from '../common/validate.middleware';

@injectable()
export class UserController extends BaseController implements IUsersController {
	userRouter: IControllerRoute[] = [
		{
			path: '/login',
			func: this.login,
			method: 'post',
			middlewares: [new ValidateMiddleware(UserLoginDto)],
		},
		{
			path: '/register',
			func: this.register,
			method: 'post',
			middlewares: [new ValidateMiddleware(UserRegisterDto)],
		},
	];

	constructor(
		@inject(TYPES.ILogger) private loggerService: ILogger,
		@inject(TYPES.UserService) private userService: UserService,
	) {
		super(loggerService);
		this.bindRoutes(this.userRouter);
	}

	async login(
		{ body }: Request<{}, {}, UserLoginDto>,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		const result = await this.userService.validateUser(body);

		if (result) this.ok(res, 'Авторизация выполнена успешно!');
		if (!result) next(new HTTPError(401, 'ошибка авторизации'));
	}
	async register(
		{ body }: Request<{}, {}, UserRegisterDto>,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		const result = await this.userService.createUser(body);
		if (!result) {
			return next(new HTTPError(422, 'Такой пользователь существует'));
		}
		this.ok(res, { email: result.email, id: result.id });
	}
}
