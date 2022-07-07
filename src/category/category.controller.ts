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
import { Category } from '../../entities/Category';
import { CategoryDto } from './category.dto';
import { CategoryService } from './category.service';

@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService,private logService:LogService) { }
  @Get('/master')
  async findMaster() {
    const category = await this.categoryService.findMaster().catch(async (err: Error) => {
      let dataLog = {
        loginId: 2,
        file: 'category-findMaster',
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
      message: 'data fetched successfully',
      category
    };
  }
  @Post('/categories')
  @UseInterceptors(FileInterceptor(''))
  async Categories(@UploadedFile() file: Express.Multer.File,@Body() data:{}) {
    let categorys = await this.categoryService.categories(data).catch(async (err: Error) => {
      let dataLog = {
        loginId: 2,
        file: 'category-Categories',
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
      data: categorys
    };
  }



}