import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateCartDto {
  @IsNumber()
  @IsNotEmpty()
  cartItemId: number;

  @IsNumber()
  @IsNotEmpty()
  quantity: number;
}
