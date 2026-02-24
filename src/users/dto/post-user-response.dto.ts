import { ApiProperty } from '@nestjs/swagger';
import { UserRolesEnum } from '../enums/user-roles.enum';

export class PostUserResponseDto {
    @ApiProperty({
        description: 'Unique identifier of the user',
        example: 1,
    })
    id: number;

    @ApiProperty({
        description: 'Name of the user',
        example: 'Juan Lopez'
    })
    name: string;

    @ApiProperty({
        description: 'Email address of the user',
        example: 'juan.lopez@example.com',
        uniqueItems: true
    })
    email: string;

    @ApiProperty({ enum: UserRolesEnum })
    role: UserRolesEnum;

    @ApiProperty({ description: 'Date when the user was created' })
    createdAt: Date;

    @ApiProperty({ description: 'Date when the user was last updated' })
    updatedAt: Date;

}
