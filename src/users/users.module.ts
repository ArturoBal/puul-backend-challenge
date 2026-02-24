import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UsersCustomRepository } from './repositories/users.repositories';
import { Task } from 'src/tasks/entities/task.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Task])
  ],
  controllers: [UsersController],
  providers: [UsersService, UsersCustomRepository, User],
  exports: [UsersCustomRepository]
})
export class UsersModule { }
