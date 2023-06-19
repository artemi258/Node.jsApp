import { IsEmail, IsString } from 'class-validator';

export class UserRegisterDto {
	@IsEmail({}, { message: 'Неверно указан email' })
	email: string | undefined;
	@IsString({ message: 'Не указан пароль' })
	password: string | undefined;
	@IsString({ message: 'Не указано имя' })
	name: string | undefined;
}
