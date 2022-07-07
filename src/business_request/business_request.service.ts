import { Injectable, HttpStatus } from '@nestjs/common';
import { BusinessRequestdto } from './business_request.dto';
import { BusinessRequests } from '../../entities/BusinessRequests';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { comparePassword, encodePassword } from 'src/utils/bcrypt';

@Injectable()
export class BusinessRequestService {
  constructor(
    @InjectRepository(BusinessRequests)
    private businessRequest: Repository<BusinessRequests>,
  ) { }

  async showAll() {
    return await this.businessRequest.find();
  }

  async create(data: BusinessRequests) {
    data.password=encodePassword(data.password);
    // const matched=comparePassword(,)
    const user = this.businessRequest.create(data);
    await this.businessRequest.save(data);
    return user;
  }

  // async findByEmail(email: string): Promise<BusinessRequestdto> {
  //   return await this.businessRequest.findOne({
  //     where: {
  //       email: email,
  //     },
  //   });
  // }

  async read(id: number) {
    return await this.businessRequest.findOne({ where: { id: id } });
  }

  //   async update(id: number, data: Partial<BusinessRequestdto>) {
  //     await this.businessRequest.update({ id }, data);
  //     return await this.businessRequest.findOne({ id });
  //   }

  async destroy(id: number) {
    await this.businessRequest.delete({ id });
    return { deleted: true };
  }
}