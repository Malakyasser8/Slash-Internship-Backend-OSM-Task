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
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ApplyCouponOrderDto } from './dto/coupon-order.dto';

@Controller('api/orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.create(createOrderDto);
  }

  @Get(':orderId')
  findOne(@Param('orderId') id: string) {
    return this.orderService.findOne(+id);
  }

  @Put(':orderId/status')
  update(
    @Param('orderId') orderId: string,
    @Body() updateOrderDto: UpdateOrderDto,
  ) {
    return this.orderService.update(+orderId, updateOrderDto);
  }

  @Post('apply-coupon')
  applyCoupon(@Body() applyCouponOrderDto: ApplyCouponOrderDto) {
    return this.orderService.applyCoupon(applyCouponOrderDto);
  }
}
