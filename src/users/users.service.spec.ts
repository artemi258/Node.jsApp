import 'reflect-metadata';

import { Container } from 'inversify';
import { IConfigService } from '../config/config.service.interface';
import { IUsersRepository } from './users.repository.interface';
import { IUserService } from './users.service.interface';
import { TYPES } from '../types';
import { UserService } from './users.service';
import { User } from './user.entity';
import { UserModel } from '@prisma/client';

const ConfigServiceMock: IConfigService = {
	get: jest.fn(),
};
const UsersRepositoryMock: IUsersRepository = {
	find: jest.fn(),
	create: jest.fn(),
};

const container = new Container();
let configService: IConfigService;
let usersRepository: IUsersRepository;
let usersService: IUserService;

beforeAll(() => {
	container.bind<IUserService>(TYPES.UserService).to(UserService);
	container.bind<IConfigService>(TYPES.ConfigService).toConstantValue(ConfigServiceMock);
	container.bind<IUsersRepository>(TYPES.UsersRepository).toConstantValue(UsersRepositoryMock);

	configService = container.get<IConfigService>(TYPES.ConfigService);
	usersRepository = container.get<IUsersRepository>(TYPES.UsersRepository);
	usersService = container.get<IUserService>(TYPES.UserService);
});
let createdUser: UserModel | null;
describe('User Service', () => {
	it('createUser', async () => {
		configService.get = jest.fn().mockReturnValueOnce('15');
		usersRepository.create = jest.fn().mockImplementationOnce((user: User): UserModel | void => {
			if (user.name && user.email && user.password) {
				return {
					name: user.name,
					email: user.email,
					password: user.password,
					id: 1,
				};
			}
		});
		createdUser = await usersService.createUser({
			email: 'a@a.ru',
			name: 'Artem',
			password: '123',
		});
		expect(createdUser?.id).toEqual(1);
		expect(createdUser?.password).not.toEqual('123');
	});
	it('validateUser - success', async () => {
		usersRepository.find = jest.fn().mockReturnValueOnce(createdUser);
		let valid;
		if (createdUser) {
			valid = await usersService.validateUser({
				email: 'a@a.ru',
				password: '123',
			});
		}
		expect(valid).toBeTruthy();
	});
	it('validateUser - null', async () => {
		usersRepository.find = jest.fn().mockReturnValueOnce(null);
		let valid;
		if (createdUser) {
			valid = await usersService.validateUser({
				email: 'a@a.ru',
				password: '123',
			});
		}
		expect(valid).toBeFalsy();
	});
	it('validateUser - false', async () => {
		usersRepository.find = jest.fn().mockReturnValueOnce(createdUser);
		let valid;
		if (createdUser) {
			valid = await usersService.validateUser({
				email: 'a@a.ru',
				password: '1234',
			});
		}
		expect(valid).toBeFalsy();
	});
});
