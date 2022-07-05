import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Activity } from '../../entities/Activity';
@Injectable()
export class ActivityService {

    constructor(
        @InjectRepository(Activity)
        private activitiesRepository: Repository<Activity>,
      ) {}
    
      findAll(): Promise<Activity[]> {
        return this.activitiesRepository.find();
      }
    
    
}
