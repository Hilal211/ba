import {
    Body,
    Controller,
    Delete,
    Get,
    HttpException,
    HttpStatus,
    Param,
    Patch,
    Post,
    UploadedFile,
    UseInterceptors,
} from '@nestjs/common';
import { ParseIntPipe } from '@nestjs/common/pipes/parse-int.pipe';
import { FileInterceptor } from '@nestjs/platform-express';
import { LogService } from 'src/log/log.service';
import { Login } from '../../entities/Login';
import { LoginDto } from './login.dto';
import { LoginService } from './login.service';
import { MailerService } from '@nestjs-modules/mailer';
@Controller('user')
export class LoginController {
    constructor(private loginService: LoginService, private logService: LogService, private mailService: MailerService) { }

    @Get('/getall')
    async findAll() {
        let logins = await this.loginService.findAll().catch(async (err: Error) => {
            let dataLog = {
                loginId: 2,
                file: 'login-findAll',
                extra: err.stack.toString(),
                error: err.message.toString(),
            }
            await this.logService.create(dataLog);
            throw new HttpException({
                statusCode: HttpStatus.BAD_REQUEST,
                message: err.message
            }, HttpStatus.BAD_REQUEST);
        })
        return {
            statusCode: HttpStatus.OK,
            message: 'success',
            data: logins
        };
    }

    @Post('/add')
    @UseInterceptors(FileInterceptor(''))
    async createUser(@UploadedFile() file: Express.Multer.File, @Body() data: Login) {
        const user = await this.loginService.create(data).catch(async (err: Error) => {
            let dataLog = {
                loginId: 1,
                file: 'login-createUser',
                extra: err.stack.toString(),
                error: err.message.toString(),
            }
            await this.logService.create(dataLog);
            throw new HttpException({
                statusCode: HttpStatus.BAD_REQUEST,
                message: "error"
            }, HttpStatus.BAD_REQUEST);
        })
        if (user) {
            await this.mailService.sendMail({
                to: user.email,
                from: "nani.bommidi93@gmail.com",
                subject: 'Email Verification',
                text: 'Aplo verify your email',
                html: '<table><tr><td><a href="http://localhost:5000/user/verify/' + user.id + '">Click here</a></td></tr></table>'
            });
        }
        return {
            statusCode: HttpStatus.OK,
            message: 'User create successfully',
            user
        };
    }

    @Get('/verify/:id')
    async verificationEmail(@Param('id') id: number) {
        const token = Math.random().toString(36).substr(2);
        const data = {
            verificationToken: token
        }
        await this.loginService.verify(id, data).catch(async (err: Error) => {
            let dataLog = {
                loginId: 2,
                file: 'login-verificationEmail',
                extra: err.stack.toString(),
                error: err.message.toString(),
            }
            await this.logService.create(dataLog);
            throw new HttpException({
                statusCode: HttpStatus.BAD_REQUEST,
                message: "error"
            }, HttpStatus.BAD_REQUEST);
        })
        return {
            statusCode: HttpStatus.OK,
            message: 'User updated successfully',
        };
    }

    @Post('/login')
    @UseInterceptors(FileInterceptor(''))
    async login(@UploadedFile() file: Express.Multer.File, @Body() data: Login) {
        const login = await this.loginService.login(data).catch(async (err: Error) => {
            let dataLog = {
                loginId: 2,
                file: 'login-login',
                extra: err.stack.toString(),
                error: err.message.toString(),
            }
            await this.logService.create(dataLog);
            throw new HttpException({
                statusCode: HttpStatus.BAD_REQUEST,
                message: "error"
            }, HttpStatus.BAD_REQUEST);
        })
        if (login != null) {
            return {
                statusCode: HttpStatus.OK,
                message: 'login successfully',
                login
            };
        }
        else{
            return {
                statusCode: HttpStatus.OK,
                message: 'eamil or password wrong',
                login
            };
        }
    }

}