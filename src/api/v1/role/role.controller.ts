import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { createRoleSchema, updateRoleSchema, validateIdSchema } from './role.validator.schema';
import { RoleService } from './role.service';
import { ValidatorService } from 'src/core/common/validator/validator.service';

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
    async create(@Body() body: object) {
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
    async update(@Body() body: object) {
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
