import { IsEnum, IsNotEmpty, IsNumber } from 'class-validator';

export enum OrderStatus {
  Pending = 'Pending',
  Processing = 'Processing',
  Shipped = 'Shipped',
  Delivered = 'Delivered',
  Cancelled = 'Cancelled',
}

export class UpdateOrderDto {
  @IsNotEmpty()
  @IsEnum(OrderStatus)
  status: string;
}
