import { hash } from 'bcryptjs';

export class User {
	private _password: string | undefined;

	constructor(
		private readonly _email: string | undefined,
		private readonly _name: string | undefined,
	) {}

	get email(): string | undefined {
		return this._email;
	}

	get name(): string | undefined {
		return this._name;
	}

	get password(): string | undefined {
		return this._password;
	}

	public async setPassword(pass: string | undefined): Promise<void> {
		if (pass) this._password = await hash(pass, 10);
	}
}
