import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Brand } from '../../entities/Brand';
@Injectable()
export class BrandService {

    constructor(
        @InjectRepository(Brand)
        private brandsRepository: Repository<Brand>,
      ) {}
    
      findAll(): Promise<Brand[]> {
        return this.brandsRepository.find();
      }
    
    
}
