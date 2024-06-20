import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class ProductService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createProductDto: Prisma.ProductCreateInput) {
    return await this.databaseService.product.create({
      data: createProductDto,
    });
  }

  async findAll() {
    return await this.databaseService.product.findMany({});
  }
}
