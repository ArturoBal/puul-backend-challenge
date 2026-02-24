import { Transform, Type } from "class-transformer";
import { IsOptional, IsPositive, Min } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class PaginationDto {

    @ApiProperty({
        description: 'Number of items to return',
        example: 10,
        required: false,
    })
    @IsOptional()
    @IsPositive()
    @Type(() => Number)
    limit?: number;

    @ApiProperty({
        description: 'Number of items to skip',
        example: 0,
        required: false,
    })
    @IsOptional()
    @Min(0)
    @Type(() => Number)
    offset?: number;
}