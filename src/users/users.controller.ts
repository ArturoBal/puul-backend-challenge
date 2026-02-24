import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, ParseUUIDPipe, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiTags, ApiOkResponse, ApiBadRequestResponse, ApiNotFoundResponse, ApiInternalServerErrorResponse, ApiCreatedResponse, ApiConflictResponse } from '@nestjs/swagger';
import { CreateUserRequestDto, GetAllUsersRequestDto, GetAllUsersResponseDto, PostUserResponseDto } from './dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @ApiCreatedResponse({
    description: 'The user has been successfully created.',
    type: PostUserResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'Bad Request.',
  })
  @ApiConflictResponse(
    {
      description: 'Conflict. A user with the provided email already exists.',
    }
  )
  @ApiInternalServerErrorResponse({
    description: 'An error occurred while creating the user.',
  })

  @Post()
  createUser(@Body() createUserDto: CreateUserRequestDto): Promise<PostUserResponseDto> {
    return this.usersService.createUser(createUserDto);
  }

  @ApiOkResponse({
    description: 'List of users retrieved successfully.',
    type: GetAllUsersResponseDto,
  })
  @Get()
  getAllUsers(@Query() getAllUsersRequestDto: GetAllUsersRequestDto): Promise<GetAllUsersResponseDto> {
    return this.usersService.getAllUsers(getAllUsersRequestDto);
  }
}
