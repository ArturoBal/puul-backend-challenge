import { ApiProperty } from "@nestjs/swagger";

export class TaskAnalyticsResponseDto {

    @ApiProperty({
        description: 'Total number of tasks',
        example: 100
    })
    total: number;

    @ApiProperty({
        description: 'Number of tasks created in the last 7 days',
        example: 10
    })
    statusCounts: Record<string, number>;
}