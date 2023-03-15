import { Controller, Get } from '@nestjs/common';
import { IndexService } from './index.service';
import { PublicRoute } from 'src/core/decorator/public-route.decorator';

@Controller()
export class IndexController {
	constructor(
		private readonly appService: IndexService
	) { }

	@Get()
	@PublicRoute()
	getHello(): string {
		return this.appService.getHello();
	}

	@Get('api')
	getHelloFromApi(): string {
		return this.appService.getHelloFromApi();
	}

}
