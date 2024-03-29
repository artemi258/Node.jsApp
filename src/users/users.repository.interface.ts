import { UserModel } from '@prisma/client';
import { User } from './user.entity';

export interface IUsersRepository {
	create: (user: User) => Promise<UserModel | null>;
	find: (email: string | undefined) => Promise<UserModel | null>;
}
