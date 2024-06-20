import { IsNotEmpty, IsNumber } from 'class-validator';

export class AddCartDto {
  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @IsNumber()
  @IsNotEmpty()
  productId: number;
}
