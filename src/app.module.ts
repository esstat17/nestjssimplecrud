// npm i -g @nestjs/cli
import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
// import { TypeOrmModule } from '@nestjs/typeorm';
// nest generate module user
@Module({
  imports: [UsersModule],
})
export class AppModule {}
