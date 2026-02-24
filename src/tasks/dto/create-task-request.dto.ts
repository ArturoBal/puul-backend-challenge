import { IsArray, IsDate, IsEnum, IsInt, IsNumber, IsOptional, IsPositive, IsString, Max, MaxLength, Min, MinDate, MinLength } from "class-validator";
import { TaskStatusEnum } from "../enums/task-status.enum";
import { Type } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";

export class CreateTaskRequestDto {

    @ApiProperty({
        description: 'Title of the task',
        example: 'Fix login bug',
    })
    @IsString()
    @MinLength(3)
    @MaxLength(50)
    title: string;

    @ApiProperty({
        description: 'Detailed description of the task',
        example: 'Users are unable to log in due to a server error. This task involves investigating the issue, identifying the root cause, and implementing a fix.',
    })
    @IsString()
    @MinLength(3)
    @MaxLength(200)
    description: string;

    @ApiProperty({
        description: 'Estimated hours to complete the task',
        example: 5,
    })
    @IsInt()
    @Min(1)
    @Type(() => Number)
    estimatedHours: number;

    @ApiProperty({
        description: 'Expiration date of the task',
        example: '2024-12-31T23:59:59Z',
    })
    @MinDate(new Date(), {
        message: 'expirationDate cannot be less than current date',
    })
    @IsDate()
    @Type(() => Date)
    expirationDate: Date;

    @ApiProperty({
        description: 'Status of the task',
        example: 'active',
        enum: TaskStatusEnum,
    })
    @IsEnum(TaskStatusEnum)
    @IsOptional()
    status?: TaskStatusEnum;

    @ApiProperty({
        description: 'List of user IDs assigned to the task',
        example: [1, 2, 3],
    })
    @IsArray()
    @IsInt({ each: true })
    @Type(() => Number)
    userIds: number[];

    @ApiProperty({
        description: 'Cost of the task',
        example: 10.99,
    })
    @IsNumber({ maxDecimalPlaces: 2 })
    @IsPositive()
    @Max(10000)
    @Type(() => Number)
    cost: number;
}
