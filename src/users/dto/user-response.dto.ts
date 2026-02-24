import { ApiProperty } from '@nestjs/swagger';
import { PostUserResponseDto } from './post-user-response.dto';

export class UserResponseDto extends PostUserResponseDto {

    @ApiProperty({
        description: 'Number of tasks assigned to the user',
        example: 5
    })
    taskCount?: number;

    @ApiProperty({
        description: 'Total cost of tasks assigned to the user',
        example: 100.50
    })
    totalTaskCost?: number;
}

export class GetAllUsersResponseDto {
    @ApiProperty({ type: () => [UserResponseDto] })
    data: UserResponseDto[];

    @ApiProperty({ description: 'Metadata about the response, including total count of users' })
    metadata: { total: number };
}
