import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';
import { Login } from '../../entities/Login';
import { LogModule } from 'src/log/log.module';

@Module({
  imports: [TypeOrmModule.forFeature([Login]),LogModule],
  providers: [LoginService],
  controllers: [LoginController],
})
export class LoginModule {}