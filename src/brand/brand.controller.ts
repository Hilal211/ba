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
} from '@nestjs/common';
import { ParseIntPipe } from '@nestjs/common/pipes/parse-int.pipe';
import { LogService } from 'src/log/log.service';
import { Brand } from '../../entities/Brand';
import { BrandService } from './brand.service';

@Controller('brand')
export class BrandController {
  constructor(private brandService: BrandService,private logService:LogService) { }

  @Get('/getall')
  async findAll() {
    let brands = await this.brandService.findAll().catch(async (err: Error) => {
      let dataLog = {
        loginId: 2,
        file: 'brand-findAll',
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
      data: brands
    };
  }

}