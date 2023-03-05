import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { FastifyRequest, FastifyReply } from 'fastify';
import ClientException from '../exceptions/ClientException';
import ServerException from '../exceptions/ServerException';

// @Catch(HttpException) // No need, because this use generic type exception
export default class HttpExceptionFilter<T> implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<FastifyReply>();
    const request = ctx.getRequest<FastifyRequest>();

    let code: any = 500;
    let message: string = '';
    let detail: any = null;

    if (exception instanceof Error) {
      message = exception.message;
    }
    
    if (exception instanceof HttpException) {
      code = exception.getStatus();
      message = exception.message;
      detail = exception.getResponse();
    }

    if (exception instanceof ClientException || exception instanceof ServerException) {
      code = exception.getCode()
      message = [exception.getName(), exception.getMessage()].join(' - ');
      detail = exception.getError();
    }

    response.status(code).send({
      code,
      message,
      error: detail,
    });
  }
}
