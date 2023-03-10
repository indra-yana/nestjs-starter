import { AuthService, LINK_TYPE } from 'src/core/common/auth/auth.service';
import { Body, Controller, Post, Get, Req, UploadedFile, UseInterceptors } from '@nestjs/common';
import { createUserSchema } from '../user/user.validator.schema';
import { FileInterceptor } from '@nest-lab/fastify-multer';
import { localStorage } from 'src/core/common/storage/local.storage';
import { MailerService } from 'src/core/common/mailer/mailer.service';
import { PublicRoute } from 'src/core/decorator/public-route.decorator';
import { UserService } from '../user/user.service';
import { ValidatorService } from 'src/core/common/validator/validator.service';

@Controller({
    path: 'auth',
    version: '1',
})
export class RegisterController {

    constructor(
        private validator: ValidatorService,
        private mailerService: MailerService,
        private userService: UserService,
        private authService: AuthService,
    ) { }

    @UseInterceptors(FileInterceptor('avatar', {
        storage: localStorage(),
    }))
    @PublicRoute()
    @Post('register')
    async register(@Req() request: any, @Body() body: any, @UploadedFile() file: Express.Multer.File) {
        try {
            this.validator.schema(createUserSchema).validate({
                ...body,
                ...file
            });

            const user = await this.userService.create(body, null, false);
            const email = body.email
            const link = await this.authService.generateLink(email, LINK_TYPE.VERIFY);

            if (link.url !== null) {
                this.mailerService.sendVerificationEmail(email, link);
            }

            if (file) {
                this.userService
                    .setHttpRequest(request)
                    .uploadAvatar(user.id, file);
            }

            return {
                message: link.message,
                ...user,
            };
        } catch (error) {
            throw error;
        }
    }

}
