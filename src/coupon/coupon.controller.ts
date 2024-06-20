import { Controller, Get, Post, Body } from '@nestjs/common';
import { CouponService } from './coupon.service';
import { Prisma } from '@prisma/client';

@Controller('api/coupons')
export class CouponController {
  constructor(private readonly couponService: CouponService) {}

  @Post()
  create(@Body() createCouponDto: Prisma.CouponCreateInput) {
    return this.couponService.create(createCouponDto);
  }

  @Get()
  findAll() {
    return this.couponService.findAll();
  }
}
