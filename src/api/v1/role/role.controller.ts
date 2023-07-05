import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { createRoleSchema, updateRoleSchema, validateIdSchema } from './role.validator.schema';
import { RoleService } from './role.service';
import { UpdateRoleDto } from './dto/update-role.dto';
import { ValidatorService } from 'src/core/common/validator/validator.service';

@UseInterceptors(ClassSerializerInterceptor)
@Controller({
    path: 'role',
    version: '1',
})
export class RoleController {
    constructor(
        private roleService: RoleService,
        private validator: ValidatorService,
    ) { }

    @Post('create')
    async create(@Body() body: CreateRoleDto) {
        try {
            this.validator.schema(createRoleSchema).validate(body);

            const result = await this.roleService.create(body);
            return result;
        } catch (error) {
            throw error;
        }
    }

    @Delete('delete')
    async delete(@Body('id') id: string) {
        try {
            this.validator.schema(validateIdSchema).validate({ id });

            const result = await this.roleService.delete(id);
            return result;
        } catch (error) {
            throw error;
        }
    }

    @Put('update')
    async update(@Body() body: UpdateRoleDto) {
        try {
            this.validator.schema(updateRoleSchema).validate(body);

            const result = await this.roleService.update(body);
            return result;
        } catch (error) {
            throw error;
        }
    }

    @Get('list')
    async all() {
        try {
            const result = await this.roleService.all();
            return result;
        } catch (error) {
            throw error;
        }
    }

    @Get('show/:id')
    async show(@Param('id') id: string) {
        try {
            this.validator.schema(validateIdSchema).validate({ id });

            const result = await this.roleService.find(id);
            return result;
        } catch (error) {
            throw error;
        }
    }
}
