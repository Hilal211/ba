import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository,IsNull } from 'typeorm';
import { Category } from '../../entities/Category';
import { CategoryDto } from './category.dto';
@Injectable()
export class CategoryService {

  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) { }
  async findMaster() {
    return await this.categoryRepository.find({
      where: { parentId: IsNull() },
       select: {
        name: true, id: true
      },
    });
  }

  async categories(data) {
    return await this.categoryRepository.find({
      where: { parentId: data.id },
       select: {
        name: true, id: true,parentId:true
      },
    });
  }




}