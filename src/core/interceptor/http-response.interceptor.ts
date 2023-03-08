import { CallHandler, ExecutionContext, Injectable, NestInterceptor, HttpStatus } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { LocaleService } from '../common/locale/locale.service';

@Injectable()
export default class HttpResponseInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const code = context.switchToHttp().getResponse().statusCode || HttpStatus.OK;
        const locale = new LocaleService();

        return next.handle().pipe(
            map((value) => {
                value = value !== undefined ? value : null
                let message = value?.message || locale.t('app.message.success');
                if (value) {
                    delete value.message;
                } 

                return {
                    code,
                    message,
                    data: value
                };
            }));
    }
}