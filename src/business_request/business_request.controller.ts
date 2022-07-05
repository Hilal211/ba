import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  HttpStatus,
  HttpException,
  UseInterceptors,
  UploadedFile
} from '@nestjs/common';

import { BusinessRequestService } from './business_request.service';
import { LogService } from '../log/log.service';
import { BusinessRequests } from '../../entities/BusinessRequests';
import { Log } from 'entities/Log';
import { FileSystemStoredFile, FormDataRequest } from 'nestjs-form-data';
import {FileInterceptor} from '@nestjs/platform-express'
@Controller('business-request')
export class BusinessRequestController {
  constructor(private businessRequestService: BusinessRequestService, private logService: LogService) {
  }

  @Get()
  async showAllUsers() {
    const users = await this.businessRequestService.showAll();
    return {
      statusCode: HttpStatus.OK,
      message: 'Users fetched successfully',
      users
    };
  }

  @Post('/add')
  @UseInterceptors(FileInterceptor(''))
  async createBusinessRequest(@UploadedFile() file: Express.Multer.File,@Body() data: BusinessRequests) {
    console.log(data)
    const request = await this.businessRequestService.create(data).catch(async (err: Error) => {
      let dataLog = {
        loginId: 2,
        file: 'business_request-createBusinessRequest',
        extra: err.stack.toString(),
        error: err.message.toString(),
      }
      await this.logService.create(dataLog);
      throw new HttpException({
        statusCode: HttpStatus.BAD_REQUEST,
        message: "Your request not send"
      }, HttpStatus.BAD_REQUEST);
    })
    return {
      statusCode: HttpStatus.OK,
      message: 'Your request send it successfully',
      request
    };
  }

  @Get('/spex/:id')
  async readUser(@Param('id') id: number) {
    const data = await this.businessRequestService.read(id);
    return {
      statusCode: HttpStatus.OK,
      message: 'User fetched successfully',
      data,
    };
  }

  // @Patch(':id')
  // async uppdateUser(@Param('id') id: number, @Body() data: Partial<BusinessRequest>) {
  //   await this.businessRequestService.update(id, data);
  //   return {
  //     statusCode: HttpStatus.OK,
  //     message: 'User updated successfully',
  //   };
  // }

  @Delete(':id')
  async deleteUser(@Param('id') id: number) {
    await this.businessRequestService.destroy(id);
    return {
      statusCode: HttpStatus.OK,
      message: 'User deleted successfully',
    };
  }
}