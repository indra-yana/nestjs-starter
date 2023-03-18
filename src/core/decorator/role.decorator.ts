import { SetMetadata } from '@nestjs/common';

export const USER_ROLES_KEY = 'user.roles';
export const Roles = (roles: Array<string>) => SetMetadata(USER_ROLES_KEY, roles); 