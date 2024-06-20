import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class CouponService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createCouponDto: Prisma.CouponCreateInput) {
    return await this.databaseService.coupon.create({ data: createCouponDto });
  }

  async findAll() {
    return await this.databaseService.coupon.findMany({});
  }
}
