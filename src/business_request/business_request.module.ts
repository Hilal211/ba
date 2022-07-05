import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BusinessRequests } from '../../entities/BusinessRequests';
import { BusinessRequestService } from './business_request.service';
import { BusinessRequestController } from './business_request.controller';
import { LogModule } from 'src/log/log.module';
import { LogService } from 'src/log/log.service';
@Module({
    imports: [TypeOrmModule.forFeature([BusinessRequests]),LogModule],
    controllers: [BusinessRequestController],
    providers: [BusinessRequestService],
})
export class BusinessRequestModule {}