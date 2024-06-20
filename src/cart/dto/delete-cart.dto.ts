import { IsNotEmpty, IsNumber } from 'class-validator';

export class DeleteCartDto {
  @IsNumber()
  @IsNotEmpty()
  cartItemId: number;
}
