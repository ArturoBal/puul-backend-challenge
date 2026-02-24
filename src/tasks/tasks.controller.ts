import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateTaskRequestDto, GetAllTasksRequestDto, GetAllTasksResponseDto, TaskAnalyticsResponseDto, TaskResponseDto, UpdateTaskRequestDto } from './dto';

@ApiTags('Tasks')
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) { }

  @ApiCreatedResponse({
    description: 'The task has been successfully created.',
    type: TaskResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'Bad Request.',
  })
  @ApiNotFoundResponse({
    description: 'Task not found.',
  })
  @Post()
  createTask(@Body() createTaskDto: CreateTaskRequestDto): Promise<TaskResponseDto> {
    return this.tasksService.createTask(createTaskDto);
  }

  @ApiOkResponse({
    description: 'List of tasks retrieved successfully.',
    type: GetAllTasksResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'Bad Request.',
  })
  @Get()
  getAllTasks(@Query() getAllTasksRequestDto: GetAllTasksRequestDto) {
    return this.tasksService.getAllTasks(getAllTasksRequestDto);
  }

  @ApiOkResponse({
    description: 'The task has been successfully updated.',
    type: TaskResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'Bad Request.',
  })
  @ApiNotFoundResponse({
    description: 'Task not found.',
  })
  @Patch(':id')
  updateTask(@Param('id', ParseIntPipe) id: number, @Body() updateTaskDto: UpdateTaskRequestDto) {
    return this.tasksService.updateTask(id, updateTaskDto);
  }

  @ApiOkResponse({
    description: 'The task has been successfully deleted.',
  })
  @ApiNotFoundResponse({
    description: 'Task not found.',
  })
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.tasksService.deleteTask(id);
  }

  @ApiOkResponse({
    description: 'Analytics data retrieved successfully.',
    type: TaskAnalyticsResponseDto,
  })
  @Get('analytics')
  getAnalytics(): Promise<TaskAnalyticsResponseDto> {
    return this.tasksService.getAnalytics();
  }

}
