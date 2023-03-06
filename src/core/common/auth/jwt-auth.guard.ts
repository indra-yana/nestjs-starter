import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FastifyRequest, FastifyReply } from 'fastify';
import { LoginService } from 'src/api/v1/login/login.service';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt_auth') {

    constructor(private loginService: LoginService) {
        super();
    }

    canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest<FastifyRequest>();
        const auth = request.headers['authorization'];
        const token = auth.split(' ')[1];

        const user = this.loginService.verifyJwt(token);
        if (user) {
            request['user'] = user;
            return true;
        }

        return super.canActivate(context);
    }
}
