import { App } from '../app';
import { boot } from '../main';
import request from 'supertest';
let application: App;

beforeAll(async () => {
	const { app } = await boot;
	application = app;
});

describe('Users 2e2', () => {
	it('Register - error', async () => {
		const res = await request(application.app).post('/users/register').send({
			email: 'a@a.ru',
			password: '1',
		});
		expect(res.statusCode).toBe(422);
	});

	it('Login - success', async () => {
		const res = await request(application.app).post('/users/login').send({
			email: 'qwe@amail.ru',
			password: '123',
		});

		expect(res.body).not.toBeUndefined();
	});
	it('Login - success', async () => {
		const res = await request(application.app).post('/users/login').send({
			email: 'qwe@amail.ru',
			password: '12',
		});

		expect(res.statusCode).toBe(401);
	});
	it('Info - success', async () => {
		const login = await request(application.app).post('/users/login').send({
			email: 'qwe@amail.ru',
			password: '123',
		});
		const res = await request(application.app)
			.get('/users/info')
			.set('Authorization', `Bearer ${login.body}`);

		expect(res.body.email).toBe('qwe@amail.ru');
	});
	it('Info - error', async () => {
		const login = await request(application.app).post('/users/login').send({
			email: 'qwe@amail.ru',
			password: '123',
		});
		const res = await request(application.app).get('/users/info').set('Authorization', `Bearer 1`);

		expect(res.statusCode).toBe(401);
	});
});
afterAll(() => {
	application.close();
});
