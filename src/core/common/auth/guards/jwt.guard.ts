import { AuthGuard } from '@nestjs/passport';
import { AuthService } from 'src/core/common/auth/auth.service';
import { ExecutionContext, Injectable } from '@nestjs/common';
import { IS_PUBLIC_KEY } from 'src/core/decorator/public-route.decorator';
import { Reflector } from '@nestjs/core';

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

            return super.canActivate(context);
        } catch (error) {
            return false;
        }
    }
}
