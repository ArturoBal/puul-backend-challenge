import { ConflictException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { PostUserResponseDto } from './dto/post-user-response.dto';
import { UsersCustomRepository } from './repositories/users.repositories';
import { CreateUserRequestDto, GetAllUsersRequestDto, GetAllUsersResponseDto, UserResponseDto } from './dto';

@Injectable()
export class UsersService {
  private readonly logger = new Logger('UsersService')
  constructor(
    private readonly usersRepository: UsersCustomRepository
  ) { }

  async createUser(createUserDto: CreateUserRequestDto): Promise<PostUserResponseDto> {
    try {
      const user = this.usersRepository.create(createUserDto);

      const saved = await this.usersRepository.saveUser(user);
      this.logger.log(`User created with id: ${saved.id}`);
      return plainToInstance(UserResponseDto, saved);
    } catch (error) {
      this.logger.error(error.message);
      if (error.code === '23505') throw new ConflictException(`User with email: ${createUserDto.email} already exists`);
      throw new InternalServerErrorException('An error occurred while creating the user');
    }
  }

  async getAllUsers(requestDto: GetAllUsersRequestDto): Promise<GetAllUsersResponseDto> {
    const [users, count] = await this.usersRepository.getAllUsers(requestDto);

    const usersWithAggregates = users.map(user => {
      const taskCount = user.tasks?.length ?? 0;
      const totalTaskCost = (user.tasks || []).
        reduce((sum, task) => sum + Number(task.cost || 0), 0);

      return {
        ...user,
        taskCount,
        totalTaskCost,
      };
    });

    const data = usersWithAggregates.map(user => plainToInstance(UserResponseDto, user));
    return { data, metadata: { total: count } };
  }
}
