import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { TasksCustomRepository } from './repositories/tasks-custom.repository';
import { UsersCustomRepository } from 'src/users/repositories/users.repositories';
import { User } from 'src/users/entities/user.entity';
import { EntityNotFoundError } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { CreateTaskRequestDto, GetAllTasksRequestDto, GetAllTasksResponseDto, TaskAnalyticsResponseDto, TaskResponseDto, UpdateTaskRequestDto } from './dto';


@Injectable()
export class TasksService {
  private readonly logger = new Logger('TaskService')

  constructor(
    private readonly tasksCustomRepository: TasksCustomRepository,
    private readonly usersCustomRepository: UsersCustomRepository
  ) {

  }

  async createTask(createTaskDto: CreateTaskRequestDto): Promise<TaskResponseDto> {
    const { userIds, ...params } = createTaskDto

    try {
      const [_users, count] = await this.usersCustomRepository.getUsersInArray(userIds);

      if (userIds.length !== count) throw new BadRequestException(`Users with one or more provided ids: ${userIds} do not exist`);

      const task = this.tasksCustomRepository.create({
        ...params,
        users: userIds?.map(id => ({ id })),
      });

      const saved = await this.tasksCustomRepository.save(task);
      this.logger.log(`Task created with id: ${saved.id}`);
      return plainToInstance(TaskResponseDto, saved);
    } catch (error) {
      this.handleErrors(error);
      throw new InternalServerErrorException("An error occurred while creating the task");
    }
  }

  async getAllTasks(requestDto: GetAllTasksRequestDto): Promise<GetAllTasksResponseDto> {

    const [tasks, count] = await this.tasksCustomRepository.getAllTasks(requestDto);

    return {
      data: tasks.map(t => plainToInstance(TaskResponseDto, t)),
      metadata: {
        total: count
      }
    }
  }

  async updateTask(id: number, updateTaskDto: UpdateTaskRequestDto): Promise<TaskResponseDto> {
    const { usersToAdd, usersToRemove, ...params } = updateTaskDto;

    try {
      const task = await this.tasksCustomRepository.getTaskById(id);

      Object.assign(task, params);

      if (usersToAdd || usersToRemove) {
        task.users = await this.processUserUpdates(task.users, usersToAdd, usersToRemove);
      }

      const saved = await this.tasksCustomRepository.save(task);
      this.logger.log(`Task updated with id: ${saved.id}`);
      return plainToInstance(TaskResponseDto, saved);
    } catch (error) {
      this.handleErrors(error);
      throw new InternalServerErrorException("An error occurred while updating the task");
    }
  }

  async deleteTask(id: number): Promise<void> {
    try {
      await this.tasksCustomRepository.findOneByOrFail({ id });
      await this.tasksCustomRepository.softDelete(id);
    } catch (error) {
      this.handleErrors(error);
      throw new InternalServerErrorException("An error occurred while deleting the task");
    }

  }

  async getAnalytics(): Promise<TaskAnalyticsResponseDto> {
    const { total, statusCounts } = await this.tasksCustomRepository.getAnalytics();
    return { total, statusCounts };
  }

  private async processUserUpdates(
    existingUsers: User[] = [],
    usersToAdd?: number[],
    usersToRemove?: number[]
  ): Promise<User[]> {

    if (usersToRemove?.length) {
      existingUsers = existingUsers.filter(users => !usersToRemove.includes(users.id));
    }

    if (usersToAdd?.length) {
      existingUsers = await this.addUsers(existingUsers, usersToAdd);
    }
    return existingUsers;
  }

  private async addUsers(
    existingUsers: User[],
    usersToAdd: number[]
  ): Promise<User[]> {

    const existingIds = existingUsers.map(u => u.id);
    const idsToActuallyAdd = usersToAdd.filter(id => !existingIds.includes(id));

    if (idsToActuallyAdd.length === 0) return existingUsers;

    const [usersEntities] = await this.usersCustomRepository.getUsersInArray(idsToActuallyAdd);

    if (usersEntities.length !== idsToActuallyAdd.length) {
      throw new BadRequestException('One or more users to add do not exist');
    }

    return [...existingUsers, ...usersEntities];
  }

  private handleErrors(error: any) {
    this.logger.error(error.message);
    if (error instanceof EntityNotFoundError) throw new NotFoundException("Task not found");
    if (error instanceof BadRequestException) throw new BadRequestException("Invalid data provided");
  }
}
