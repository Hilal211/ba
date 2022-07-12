import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BrandsModule } from './brand/brand.module';
import { BusinessRequestModule } from './business_request/business_request.module';
import { APP_FILTER } from '@nestjs/core';
import { HttpErrorFilter } from './shared/http-error.filter';
import { LogModule } from './log/log.module';
import { ActivityModule } from './activity/activity.module';
import NestjsFormDataModule from 'nestjs-form-data'
import { LoginModule } from './login/login.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { ProductsModule } from './product/product.module';
import { CategorysModule } from './category/category.module';
import { MulterModule } from '@nestjs/platform-express';

//  import { join } from 'path';
// import { ServeStaticModule } from '@nestjs/serve-static';
@Module({
  imports: [
    BrandsModule,BusinessRequestModule,LogModule,ActivityModule,LoginModule,ProductsModule,CategorysModule,TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'aplo',
      entities: [__dirname + '/../**/entities/*.js'],
    }),
    MailerModule.forRoot({
      transport: {
        host: 'smtp.sendgrid.net',
        auth: {
          user: 'apikey',
          pass: 'SG.xxxxxxxxxxxxxxxxxxxxxxxxxx-yyyyyyyyy',
        },
      }
    }),
    MulterModule.register({
      dest:'./dist/public'
    }),
  //   ServeStaticModule.forRoot({
  //     rootPath: join(__dirname, '..', 'public'),
  // }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
