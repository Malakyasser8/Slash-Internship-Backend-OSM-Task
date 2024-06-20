import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { CartModule } from './cart/cart.module';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { OrderModule } from './order/order.module';
import { CouponModule } from './coupon/coupon.module';

@Module({
  imports: [DatabaseModule, CartModule, UserModule, ProductModule, OrderModule, CouponModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
