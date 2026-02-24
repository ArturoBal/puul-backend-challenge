import { ApiProperty } from '@nestjs/swagger';
import { TaskStatusEnum } from '../enums/task-status.enum';
import { UserResponseDto } from '../../users/dto/user-response.dto';

export class TaskResponseDto {
    @ApiProperty({ description: 'Unique identifier of the task' })
    id: number;

    @ApiProperty({
        description: 'Title of the task',
        example: 'Implement authentication module'
    })
    title: string;

    @ApiProperty({
        description: 'Description of the task',
        example: 'Implement user authentication using JWT'
    })
    description: string;

    @ApiProperty({
        description: 'Estimated hours to complete the task',
        example: 8
    })
    estimatedHours: number;

    @ApiProperty({
        description: 'Expiration date of the task',
        example: '2024-12-31T23:59:59Z'
    })
    expirationDate: Date;

    @ApiProperty({ enum: TaskStatusEnum })
    status: TaskStatusEnum;

    @ApiProperty({
        description: 'Cost of the task',
        example: 10.99
    })
    cost: number;

    @ApiProperty({ description: 'Date when the task was created' })
    createdAt: Date;

    @ApiProperty({ description: 'Date when the task was last updated' })
    updatedAt: Date;

    @ApiProperty({ type: () => [UserResponseDto], required: false })
    users?: UserResponseDto[];
}

export class GetAllTasksResponseDto {
    @ApiProperty({ type: () => [TaskResponseDto] })
    data: TaskResponseDto[];

    @ApiProperty({
        description: 'Metadata about the response, including total count of tasks',
        example: { total: 10 }
    })
    metadata: { total: number };
}
