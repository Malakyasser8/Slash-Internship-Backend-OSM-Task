import { IsNotEmpty, IsNumber } from 'class-validator';

export class ApplyCouponOrderDto {
  @IsNumber()
  @IsNotEmpty()
  orderId: number;

  @IsNumber()
  @IsNotEmpty()
  couponId: number;
}
