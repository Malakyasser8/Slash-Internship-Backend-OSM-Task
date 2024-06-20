import {
  BadRequestException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderStatus, UpdateOrderDto } from './dto/update-order.dto';
import { DatabaseService } from 'src/database/database.service';
import { ApplyCouponOrderDto } from './dto/coupon-order.dto';

@Injectable()
export class OrderService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createOrderDto: CreateOrderDto) {
    //check if user exists
    var user = await this.databaseService.user.findFirst({
      where: {
        id: createOrderDto.userId,
      },
    });
    if (!user)
      throw new NotFoundException({
        message: 'User Not Found',
        status: HttpStatus.NOT_FOUND,
        detail: `User with id '${createOrderDto.userId}' was not found`,
      });
    //check if user has cart
    var cart = await this.databaseService.cart.findFirst({
      where: {
        userId: createOrderDto.userId,
      },
    });
    if (!cart)
      throw new NotFoundException({
        message: 'Cart is empty',
        status: HttpStatus.NOT_FOUND,
        detail: `User has no products in cart`,
      });
    //get cart items
    const cartItems = await this.databaseService.cartItem.findMany({
      where: {
        cartId: cart.id,
      },
      include: {
        product: true,
      },
    });
    //if user has no cart items then cart is empty
    if (!cartItems || cartItems.length == 0)
      throw new BadRequestException({
        message: 'Cart is empty',
        status: HttpStatus.BAD_REQUEST,
        detail: `User has no products in cart`,
      });

    var totalPrice = 0;
    //remove all ordered iterms from the cart
    for (let i = 0; i < cartItems.length; i++) {
      totalPrice += cartItems[i].product.price * cartItems[i].productQuantity;
      await this.databaseService.cartItem.delete({
        where: {
          id: cartItems[i].id,
        },
      });
    }
    //create order
    const order = await this.databaseService.order.create({
      data: {
        userId: user.id,
        totalPrice: totalPrice,
        hasCoupon: false,
      },
    });
    //add all items in cart
    for (let i = 0; i < cartItems.length; i++)
      await this.databaseService.orderItem.create({
        data: {
          orderId: order.id,
          productId: cartItems[i].productId,
          productQuantity: cartItems[i].productQuantity,
        },
      });
    return await this.databaseService.order.findUnique({
      where: {
        id: order.id,
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

  async findOne(id: number) {
    const order = await this.databaseService.order.findUnique({
      where: {
        id: id,
      },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });
    if (!order)
      throw new NotFoundException({
        message: 'Order Not Found',
        status: HttpStatus.NOT_FOUND,
        detail: `Order with id '${id}' was not found`,
      });
    else return order;
  }

  async update(orderId: number, updateOrderDto: UpdateOrderDto) {
    const order = await this.databaseService.order.findUnique({
      where: {
        id: orderId,
      },
    });
    if (!order)
      throw new NotFoundException({
        message: 'Order Not Found',
        status: HttpStatus.NOT_FOUND,
        detail: `Order with id '${orderId}' was not found`,
      });
    return await this.databaseService.order.update({
      where: {
        id: orderId,
      },
      data: {
        status: OrderStatus[updateOrderDto.status],
      },
    });
  }

  async applyCoupon(applyCouponOrderDto: ApplyCouponOrderDto) {
    const order = await this.databaseService.order.findUnique({
      where: {
        id: applyCouponOrderDto.orderId,
      },
    });
    if (!order)
      throw new NotFoundException({
        message: 'Order Not Found',
        status: HttpStatus.NOT_FOUND,
        detail: `Order with id '${applyCouponOrderDto.orderId}' was not found`,
      });
    const coupon = await this.databaseService.coupon.findUnique({
      where: {
        id: applyCouponOrderDto.couponId,
      },
    });
    if (!coupon)
      throw new NotFoundException({
        message: 'Coupon Not Found',
        status: HttpStatus.NOT_FOUND,
        detail: `Coupon with id '${applyCouponOrderDto.couponId}' was not found`,
      });

    if (coupon.expires.getTime() < Date.now())
      throw new BadRequestException({
        message: 'Coupon has expired',
        status: HttpStatus.BAD_REQUEST,
        detail: `Coupon with id '${applyCouponOrderDto.couponId}' has expired`,
      });
    return await this.databaseService.order.update({
      where: {
        id: applyCouponOrderDto.orderId,
      },
      data: {
        totalPrice: order.totalPrice - order.totalPrice * coupon.discount,
        hasCoupon: true,
      },
    });
  }
}
