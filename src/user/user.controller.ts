import {
  Controller,
  Get,
  Post,
  Body,
  Param,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Prisma } from '@prisma/client';

@Controller('api/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: Prisma.UserCreateInput) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get('/:userId/orders')
  findOrders(@Param('userId') userId: string) {
    return this.userService.findOrders(+userId);
  }
}
