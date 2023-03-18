import { Module } from '@nestjs/common';
import { RoleModule } from '../role/role.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/core/common/database/typeorm/entities/user';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        RoleModule,
    ],
    exports: [UserService],
    providers: [UserService],
    controllers: [UserController],
})
export class UserModule { }
