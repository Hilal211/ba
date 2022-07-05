import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Log } from '../../entities/Log';
import { LogService } from './log.service';


@Module({
    imports: [TypeOrmModule.forFeature([Log])],
    providers: [LogService],
    exports: [LogService]
})
export class LogModule {}
