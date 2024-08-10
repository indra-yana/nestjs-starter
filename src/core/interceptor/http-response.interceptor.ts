import { CallHandler, ExecutionContext, Injectable, NestInterceptor, HttpStatus } from '@nestjs/common';
import { I18nContext } from 'nestjs-i18n';
import { map, Observable } from 'rxjs';

@Injectable()
export default class HttpResponseInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const code = context.switchToHttp().getResponse().statusCode || HttpStatus.OK;
        const i18n = I18nContext.current();

        return next.handle().pipe(
            map((value) => {
                value = value !== undefined ? value : null
                let message = value?.message || i18n.t('app.message.success');
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