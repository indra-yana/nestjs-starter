import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { FastifyRequest, FastifyReply } from 'fastify';

// @Catch(HttpException)
export class HttpExceptionFilter<T> implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<FastifyReply>();
    const request = ctx.getRequest<FastifyRequest>();

    let code: any = 500;
    let message: string = '';
    if (exception instanceof HttpException) {
      code = exception.getStatus();
      message = exception.message;
    }

    // TODO: add more http exception handler

    response.status(code).send({
      code,
      message,
      error: exception,
    });
  }
}
