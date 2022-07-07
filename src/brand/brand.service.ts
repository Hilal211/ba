import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Brand } from '../../entities/Brand';
import { BrandDto } from './brand.dto';
@Injectable()
export class BrandService {

  constructor(
    @InjectRepository(Brand)
    private brandsRepository: Repository<Brand>,
  ) { }

  findAll(): Promise<Brand[]> {
    return this.brandsRepository.find();
  }
  async update(id: number, data: Partial<BrandDto>) {
    data.updatedDate=new Date()
    await this.brandsRepository.update({ id }, data);
    return await this.brandsRepository.findOne( { where: { id: id } } );
  }


}