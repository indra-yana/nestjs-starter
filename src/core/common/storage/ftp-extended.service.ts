import { Client } from 'basic-ftp';
import { ConfigService } from '@nestjs/config';
import { IConnectionOptions } from 'nestjs-ftp';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class FtpExtendedService {
	
	private readonly _ftpClient: Client;

	private readonly _options: IConnectionOptions;

	constructor(
		private configService: ConfigService, 
	) {
		Logger.log('initialising Extended FTP Service', 'FTP EXTENDED SERVICE');
		this._options = this.configService.get('storage.disks.ftp.config');
		this._ftpClient = new Client();
	}

	async ensureDirectory(dir: string) {
		try {
			await this._ftpClient.access(this._options);
			return await this._ftpClient.ensureDir(dir);
		} catch (err) {
			this._ftpClient.close();
			throw err;
		} finally {
			this._ftpClient.close();
		}
	}
}
