import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from "class-validator";
import { UserRolesEnum } from "../enums/user-roles.enum";
import { Transform } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";

export class CreateUserRequestDto {

    @ApiProperty({
        description: 'Name of the user',
        example: 'Juan Pérez',
    })
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(50)
    name: string;

    @ApiProperty({
        description: 'Email address of the user',
        example: 'juan.perez@example.com',
        uniqueItems: true
    })
    @IsEmail()
    @IsNotEmpty()
    @Transform(({ value }) => value?.trim().toLowerCase())
    email: string;

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
