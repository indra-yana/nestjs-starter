import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { FastifyRequest, FastifyReply } from 'fastify';
import { AuthService } from 'src/core/common/auth/auth.service';
import { IS_PUBLIC_KEY } from 'src/core/decorator/public-route.decorator';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt_auth') {

    constructor(private authService: AuthService, private reflector: Reflector) {
        super();
    }

    canActivate(context: ExecutionContext) {
        try {
            const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
                context.getHandler(),
                context.getClass(),
            ]);

            if (isPublic) {
                return true;
            }

            const request = context.switchToHttp().getRequest<FastifyRequest>();
            const auth = request.headers['authorization'];
            const token = auth.split(' ')[1];
    
            const user = this.authService.verifyJwt(token);
            if (user) {
                request['user'] = user;
                return true;
            }

            return super.canActivate(context);
        } catch (error) {
            return false;
        }
    }
}
