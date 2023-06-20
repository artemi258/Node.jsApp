import { DotenvConfigOutput, config } from 'dotenv';
import { IConfigService } from './config.service.interface';
import { inject, injectable } from 'inversify';
import { TYPES } from '../types';
import { ILogger } from '../logger/logger.interface';

@injectable()
export class ConfigService implements IConfigService {
	private config: DotenvConfigOutput | undefined;
	constructor(@inject(TYPES.ILogger) private logger: ILogger) {
		const result: DotenvConfigOutput = config();
		if (result.error) {
			this.logger.error('Не удалось прочитать файл .env или он отсутствует');
		} else {
			this.config = result.parsed as DotenvConfigOutput;
		}
	}

	get(key: string): string | undefined {
		if (this.config) return this.config[key as keyof DotenvConfigOutput] as unknown as string;
	}
}
