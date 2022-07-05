import { Injectable} from '@nestjs/common';
import { Log } from '../../entities/log';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DeepPartial } from 'typeorm';
@Injectable()
export class LogService {
  constructor(
    @InjectRepository(Log)
    private log: Repository<Log>,
  ) { }



  async create(data:DeepPartial<Log>) {
    const log = this.log.create(data);
    await this.log.save(data);
  }

  
}