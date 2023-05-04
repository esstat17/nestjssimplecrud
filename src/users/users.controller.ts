import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Req,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserDto } from './dto/CreateUser.dto';
import { User } from './users.model';
import { UsersService } from './users.service';

// nest generate controller users
@Controller('users') // Decorator
export class UsersController {
  constructor(private userService: UsersService) {}
  // @Get()
  // getUsers(@Query('sort') sort: string) {
  //   console.log(sort);
  //   return this.userService.getUsers();
  // }
  // @Post()
  // @UsePipes(new ValidationPipe())
  // createUser(@Body() userData: CreateUserDto) {
  //   console.log(userData);
  //   return this.userService.createUser(userData);
  // }
  // @Get(':id')
  // getUserById(@Param('id', ParseIntPipe) id: number) {
  //   console.log(id);
  //   const user = this.userService.getUserById(id);
  //   if (!user)
  //     throw new HttpException('User not found!', HttpStatus.BAD_REQUEST);
  //   return user;
  // }
  @Get()
  getAllUsers(): User[] {
    return this.userService.findAll();
  }

  @Get(':id')
  getUserById(@Param('id', ParseIntPipe) id: number): User {
    const user = this.userService.findOne(id);
    if (!user) {
      throw new HttpException('User not found!', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  @Post()
  createUser(@Body() user: User) {
    return this.userService.create(user);
  }

  @Put(':id')
  updateUser(@Param('id', ParseIntPipe) id: number, @Body() user: User) {
    return this.userService.update(id, user);
  }

  @Delete(':id')
  deleteUser(@Param('id', ParseIntPipe) id: number): void {
    this.userService.delete(id);
  }
}
