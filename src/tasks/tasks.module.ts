import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { User } from 'src/users/entities/user.entity';
import { TasksCustomRepository } from './repositories/tasks-custom.repository';
import { UsersCustomRepository } from 'src/users/repositories/users.repositories';

@Module({
  imports: [
    TypeOrmModule.forFeature([Task, User])
  ],
  controllers: [TasksController],
  providers: [TasksService, Task, TasksCustomRepository, UsersCustomRepository],
})
export class TasksModule { }
