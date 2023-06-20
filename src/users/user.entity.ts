import { compare, hash } from 'bcryptjs';

export class User {
	private _password: string;

	constructor(
		private readonly _email: string,
		private readonly _name: string,
		passwordHash?: string,
	) {
		if (passwordHash) {
			this._password = passwordHash;
		}
	}

	get email(): string | undefined {
		return this._email;
	}

	get name(): string | undefined {
		return this._name;
	}

	get password(): string | undefined {
		return this._password;
	}

	public async setPassword(pass: string | undefined, salt: string | undefined): Promise<void> {
		if (pass && salt) this._password = await hash(pass, +salt);
	}
	public async comparePassword(pass: string): Promise<boolean> {
		return await compare(pass, this._password);
	}
}
