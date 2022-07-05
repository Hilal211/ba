import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActivityService } from './activity.service';
import { ActivityController } from './activity.controller';
import { Activity } from '../../entities/Activity';
import { LogModule } from 'src/log/log.module';

@Module({
  imports: [TypeOrmModule.forFeature([Activity]),LogModule],
  providers: [ActivityService],
  controllers: [ActivityController],
})
export class ActivityModule {}