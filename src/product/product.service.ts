import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Product } from '../../entities/Product';
import { ProductDto } from './product.dto';
import { DeepPartial } from 'typeorm';

@Injectable()
export class ProductService {

  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
  ) { }

  findAll(data): Promise<Product[]> {
    // return this.productsRepository.find({relations:['category','category.parent','category.parent.parent','brand']})

    let ob =  {
      category: {
        parent: {
          id: data.categoryId,
          parent: {
            id: data.categoryMasterId,
          }
        },
      },
      brand: {
        id: data.brandId,
      },
      name:(data.productName!=null)?Like(`%${data.productName}%`):data.productName,
    }
    console.log(ob)

    // if (data['brandId'] != null) {
    //   ob['brand'] = { id: data.brandId }
    // }
    // if (data['subCategoryId'] != null) {
      // ob['category'] = { id: data.subCategoryId }
      // if (data['categoryId'] != null) {
      //   ob['category']['parent'] = { id: data.categoryId }
      //   if (data['categoryMasterId'] != null) {
      //     ob['category']['parent']['parent'] = {
      //       id: data.categoryMasterId,
      //     }
      //   }
      // }
    // }
    // if(data.productName!=null){
    //   ob['name']=data.productName;
    // }


    return this.productsRepository.find({
      relations: ['category', 'category.parent', 'category.parent.parent', 'brand'],
      where:ob
    })
  }
  async createProduct(file,data: DeepPartial<Product>) {
    data.featuredImage=file.filename;
    const user = this.productsRepository.create(data);
    await this.productsRepository.save(data);
    return user;
  }
  // async update(id: number, data: Partial<ProductDto>) {
  //   data.updatedDate=new Date()
  //   await this.productsRepository.update({ id }, data);
  //   return await this.productsRepository.findOne( { where: { id: id } } );
  // }


}