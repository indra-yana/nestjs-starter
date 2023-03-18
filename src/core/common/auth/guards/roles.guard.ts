import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Role } from "../../database/typeorm/entities/role";
import { USER_ROLES_KEY } from "src/core/decorator/role.decorator";
import { UserService } from "src/api/v1/user/user.service";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(
        private reflector: Reflector,
        private userService: UserService,
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const requiredRoles = this.reflector.getAllAndOverride<Array<string>>(USER_ROLES_KEY, [
            context.getHandler(),
            context.getClass()
        ]);

        if (!requiredRoles) {
            return true;
        }

        const { user } = context.switchToHttp().getRequest();
        const userDetail = await this.userService.find(user._uid);
        const roles: Array<string> = userDetail.roles?.map((role: Role) => role.name.toLowerCase());
        
        return requiredRoles.some((role) => roles?.includes(role));
    }

}