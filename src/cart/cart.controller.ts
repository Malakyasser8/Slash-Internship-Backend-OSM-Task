import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { AddCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { DeleteCartDto } from './dto/delete-cart.dto';

@Controller('api/cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post('/add')
  add(@Body() createAddCartDto: AddCartDto) {
    return this.cartService.add(createAddCartDto);
  }

  @Get()
  findAll() {
    return this.cartService.findAll();
  }

  //find cart of a certain user
  @Get(':userId')
  findOne(@Param('userId') userId: string) {
    return this.cartService.findOne(+userId);
  }

  //Updates the quantity of a product in the cart
  @Put('/update')
  update(@Body() updateCartDto: UpdateCartDto) {
    return this.cartService.update(updateCartDto);
  }

  @Delete('/remove')
  remove(@Body() removeFromCartDto: DeleteCartDto) {
    return this.cartService.remove(removeFromCartDto);
  }
}
