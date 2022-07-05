import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BrandService } from './brand.service';
import { BrandController } from './brand.controller';
import { Brand } from '../../entities/Brand';
import { LogModule } from 'src/log/log.module';

@Module({
  imports: [TypeOrmModule.forFeature([Brand]),LogModule],
  providers: [BrandService],
  controllers: [BrandController],
})
export class BrandsModule {}