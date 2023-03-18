import { Module } from '@nestjs/common';
import { Role } from 'src/core/common/database/typeorm/entities/role';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Role])],
  controllers: [RoleController],
  exports: [RoleService],
  providers: [RoleService]
})
export class RoleModule {}
