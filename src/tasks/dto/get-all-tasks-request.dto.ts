
import { Transform, Type } from 'class-transformer';
import { IsBoolean, IsDate, IsEmail, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, MaxLength, MinLength } from "class-validator";
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { TaskStatusEnum } from '../enums/task-status.enum';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class GetAllTasksRequestDto extends PartialType(PaginationDto) {

    @ApiProperty({
        description: 'Filter tasks by title (partial match)',
        example: 'Fix bug',
        required: false,
    })
    @IsString()
    @MinLength(3)
    @MaxLength(50)
    @IsOptional()
    title?: string;

    @ApiProperty({
        description: 'Filter tasks by status',
        example: 'active',
        enum: TaskStatusEnum,
        required: false,
    })
    @IsOptional()
    @IsEnum(TaskStatusEnum)
    status?: TaskStatusEnum;

    @ApiProperty({
        description: 'Filter tasks by recent flag',
        example: true,
        required: false,
    })
    @IsOptional()
    @IsBoolean()
    @Transform(({ value }) => {
        if (typeof value === 'string') return value.toLowerCase() === 'true';
        return value;
    })
    recent?: boolean;

    @ApiProperty({
        description: 'Filter tasks by expiration date',
        example: '2024-12-31T23:59:59Z',
        required: false,
    })
    @IsDate()
    @IsOptional()
    @Type(() => Date)
    expirationDate?: Date;

    @ApiProperty({
        description: 'Filter tasks by assigned user ID',
        example: 1,
        required: false,
    })
    @IsNumber()
    @IsOptional()
    @IsPositive()
    @Type(() => Number)
    userId?: number;

    @ApiProperty({
        description: 'Filter tasks by assigned user email',
        example: 'juan@example.com',
        required: false,
    })
    @IsEmail()
    @IsOptional()
    @IsNotEmpty()
    @Transform(({ value }) => value?.trim().toLowerCase())
    userEmail?: string;

    @ApiProperty({
        description: 'Filter tasks by assigned user name',
        example: 'Juan',
        required: false,
    })
    @IsString()
    @IsOptional()
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(50)
    userName?: string;
}
