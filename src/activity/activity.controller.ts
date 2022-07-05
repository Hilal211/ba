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
import { Activity } from '../../entities/Activity';
import { ActivityService } from './activity.service';

@Controller('activity')
export class ActivityController {
  constructor(private activityService: ActivityService,private logService:LogService) { }

  @Get('/getall')
  async findAll() {
    let activities = await this.activityService.findAll().catch(async (err: Error) => {
      let dataLog = {
        loginId: 2,
        file: 'activity-findAll',
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
      data: activities
    };
  }

}