import {
  BadRequestException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AddCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { DatabaseService } from 'src/database/database.service';
import { DeleteCartDto } from './dto/delete-cart.dto';

@Injectable()
export class CartService {
  constructor(private readonly databaseService: DatabaseService) {}

  async checkUserIdAndProductId(productId: number, userId: number) {
    //Check if product exists
    var product = await this.databaseService.product.findFirst({
      where: {
        id: productId,
      },
    });
    if (!product)
      throw new NotFoundException({
        message: 'Product Not Found',
        status: HttpStatus.NOT_FOUND,
        detail: `Product with id '${productId}' was not found`,
      });

    //Check if user exists
    var user = await this.databaseService.user.findFirst({
      where: {
        id: userId,
      },
    });
    if (!user)
      throw new NotFoundException({
        message: 'User Not Found',
        status: HttpStatus.NOT_FOUND,
        detail: `User with id '${userId}' was not found`,
      });
  }
  async add(addToCartDto: AddCartDto) {
    //check if both user and product id exists
    await this.checkUserIdAndProductId(
      addToCartDto.productId,
      addToCartDto.userId,
    );
    //Check if user cart already exists
    var cart = await this.databaseService.cart.findFirst({
      where: {
        userId: addToCartDto.userId,
      },
      include: {
        items: true,
      },
    });
    if (!cart) {
      cart = await this.databaseService.cart.create({
        data: {
          userId: addToCartDto.userId,
        },
        include: {
          items: true,
        },
      });
    }
    //check if cart item already exists
    const cartItem = await this.databaseService.cartItem.findFirst({
      where: {
        cartId: cart.id,
        productId: addToCartDto.productId,
      },
    });
    //if it exits update the quantity
    if (cartItem) {
      return await this.databaseService.cartItem.update({
        where: {
          id: cartItem.id,
        },
        data: {
          productQuantity: cartItem.productQuantity + 1,
        },
        include: {
          product: true,
        },
      });
    } else {
      //create new item
      return await this.databaseService.cartItem.create({
        data: {
          cartId: cart.id,
          productId: addToCartDto.productId,
        },
        include: {
          product: true,
        },
      });
    }
  }

  async findAll() {
    return await this.databaseService.cart.findMany({});
  }

  //find cart of a certain user
  async findOne(userId: number) {
    //Check if user exists
    var user = await this.databaseService.user.findFirst({
      where: {
        id: userId,
      },
    });
    if (!user)
      throw new NotFoundException({
        message: 'User Not Found',
        status: HttpStatus.NOT_FOUND,
        detail: `User with id '${userId}' was not found`,
      });
    return await this.databaseService.cart.findFirst({
      where: {
        userId: userId,
      },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });
  }

  //Updates the quantity of a product in the cart
  async update(updateCartDto: UpdateCartDto) {
    if (updateCartDto.quantity != 1 && updateCartDto.quantity != -1)
      throw new BadRequestException({
        message: 'Invalid Quantity',
        status: HttpStatus.BAD_REQUEST,
        detail: `Quantity value must be 1 or -1`,
      });
    const cartItem = await this.databaseService.cartItem.findFirst({
      where: {
        id: updateCartDto.cartItemId,
      },
    });
    if (!cartItem)
      throw new NotFoundException({
        message: 'Cart Item Not Found',
        status: HttpStatus.NOT_FOUND,
        detail: `Cart Item with id '${updateCartDto.cartItemId}' was not found`,
      });
    return await this.databaseService.cartItem.update({
      where: {
        id: cartItem.id,
      },
      data: {
        productQuantity: cartItem.productQuantity + updateCartDto.quantity,
      },
      include: {
        product: true,
      },
    });
  }

  async remove(removeFromCartDto: DeleteCartDto) {
    const cartItem = await this.databaseService.cartItem.findFirst({
      where: {
        id: removeFromCartDto.cartItemId,
      },
    });
    if (!cartItem)
      throw new NotFoundException({
        message: 'Cart Item Not Found',
        status: HttpStatus.NOT_FOUND,
        detail: `Cart Item with id '${removeFromCartDto.cartItemId}' was not found`,
      });
    return await this.databaseService.cartItem.delete({
      where: {
        id: removeFromCartDto.cartItemId,
      },
    });
  }
}
