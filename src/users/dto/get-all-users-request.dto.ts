import { PaginationDto } from "src/common/dtos/pagination.dto";
import { UserRolesEnum } from "../enums/user-roles.enum";
import { IsEnum, IsOptional, IsString, MinLength } from "class-validator";
import { Transform } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";

export class GetAllUsersRequestDto extends PaginationDto {

    @ApiProperty({
        description: 'Search term for user name/email',
        example: 'Juan or juanPerez@example.com',
        required: false,
    })
    @IsString()
    @MinLength(3)
    @IsOptional()
    @Transform(({ value }) => value?.toLowerCase())
    search?: string;

    @ApiProperty({
        description: 'Role of the user',
        example: 'admin',
        enum: UserRolesEnum,
        required: false
    })
    @IsEnum(UserRolesEnum)
    @IsOptional()
    role?: UserRolesEnum
}