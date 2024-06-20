import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class UserService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createUserDto: Prisma.UserCreateInput) {
    return await this.databaseService.user.create({ data: createUserDto });
  }

  async findAll() {
    return await this.databaseService.user.findMany({});
  }

  async findOrders(userId: number) {
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

    return await this.databaseService.order.findMany({
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
}
