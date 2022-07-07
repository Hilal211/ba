import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { comparePassword } from 'src/utils/bcrypt';
import { DeepPartial, Repository } from 'typeorm';
import { Login } from '../../entities/Login';
import { LoginDto } from './login.dto';
@Injectable()
export class LoginService {

    constructor(
        @InjectRepository(Login)
        private loginRepository: Repository<Login>,
    ) { }

    findAll(): Promise<Login[]> {
        return this.loginRepository.find();
    }
    async verify(id: number, data: DeepPartial<Login>) {
        await this.loginRepository.update({ id }, data);
        return await this.loginRepository.findOne({ where: { id: id } });
    }
    async create(data: Login) {
        const user = this.loginRepository.create(data);
        await this.loginRepository.save(data);
        return user;
    }

    async login(data: Login) {
        let user = await this.loginRepository.findOne({ where: { email: data.email } });
        if (user) {
            const matched = comparePassword(data.password,user.password)
            if (matched) {
                if (user.verificationToken != null) {
                    return user;
                }
            }
        }
        user=null;
        return user
    }

}