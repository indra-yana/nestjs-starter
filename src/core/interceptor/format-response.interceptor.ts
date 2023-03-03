import { CallHandler, ExecutionContext, Injectable, NestInterceptor, HttpStatus } from '@nestjs/common';
import { map, Observable } from 'rxjs';

@Injectable()
export default class FormatResponseInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const code = context.switchToHttp().getResponse().statusCode || HttpStatus.OK;

        return next.handle().pipe(
            map(value => {
                value = (value) ? value : null
                return {
                    code,
                    message: value.message || 'Success!',
                    data: value
                };
            }));
    }
}