import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(
    private config: ConfigService
  ) { }

  getHello(): any {
    const appName = this.config.get('app.name');
    const appVersion = this.config.get('app.version');

    return `${appName} - ${appVersion}`;
  }

  getHelloFromApi(): any {
    const appName = this.config.get('app.name');
    const appVersion = this.config.get('app.version');

    return `${appName} REST API - ${appVersion}`;
  }
}
