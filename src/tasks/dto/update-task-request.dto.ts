
import { CreateTaskRequestDto } from './create-task-request.dto';
import { IsArray, IsInt, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';

export class UpdateTaskRequestDto extends PartialType(
    OmitType(CreateTaskRequestDto, ['userIds'] as const),
) {

    @ApiProperty({
        description: 'List of user IDs to add to the task',
        example: [1, 2, 3],
        required: false,
    })
    @IsArray()
    @IsInt({ each: true })
    @Type(() => Number)
    @IsOptional()
    usersToAdd?: number[];

    @ApiProperty({
        description: 'List of user IDs to remove from the task',
        example: [4, 5],
        required: false,
    })
    @IsArray()
    @IsInt({ each: true })
    @Type(() => Number)
    @IsOptional()
    usersToRemove?: number[];
}
