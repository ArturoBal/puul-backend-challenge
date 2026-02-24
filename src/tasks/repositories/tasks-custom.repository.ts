import { DataSource, Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { PaginationDto } from "src/common/dtos/pagination.dto";
import { SelectQueryBuilder } from "typeorm/browser";
import { Task } from "../entities/task.entity";
import { GetAllTasksRequestDto } from "../dto/get-all-tasks-request.dto";

@Injectable()
export class TasksCustomRepository extends Repository<Task> {
    constructor(
        private dataSource: DataSource
    ) {
        super(Task, dataSource.createEntityManager());
    }

    async getAllTasks(requestDto: GetAllTasksRequestDto): Promise<[Task[], number]> {
        const { limit = 10, offset = 0, recent, ...filters } = requestDto;

        const query = this.createQueryBuilder('task');
        query.leftJoinAndSelect('task.users', 'user')
            .addSelect(['user.id', 'user.name', 'user.email']);

        await this.applyGetAllFilters(filters, query);
        query.orderBy('task.createdAt', recent ? 'DESC' : 'ASC');
        query.take(limit).skip(offset);

        return query.getManyAndCount();
    }

    async getAnalytics(): Promise<{ total: number, statusCounts: Record<string, number> }> {
        const total = await this.count();

        const rawStatusCounts: { status: string; count: string }[] =
            await this.createQueryBuilder('task')
                .select('task.status', 'status')
                .addSelect('COUNT(task.id)', 'count')
                .groupBy('task.status')
                .getRawMany();

        const statusCounts: Record<string, number> = {};
        rawStatusCounts.forEach(r => {
            statusCounts[r.status] = Number(r.count);
        });

        return { total, statusCounts };
    }

    async getTaskById(id: number): Promise<Task> {
        return this.findOneOrFail({
            where: { id },
            relations: ['users']
        });
    }

    private async applyGetAllFilters(filters: GetAllTasksRequestDto, query: SelectQueryBuilder<Task>) {
        const { title, expirationDate, userEmail, userId, userName } = filters;

        if (title) {
            query.andWhere('LOWER(task.title) LIKE LOWER(:title)', { title: `%${title}%` });
        }

        if (expirationDate) {
            query.andWhere('task.expirationDate = :expirationDate', { expirationDate });
        }

        if (userEmail) {
            query.andWhere('user.email = :email', { email: userEmail });
        }

        if (userId) {
            query.andWhere('user.id = :userId', { userId });
        }

        if (userName) {
            query.andWhere('LOWER(user.name) LIKE LOWER(:name)', { name: `%${userName}%` });
        }
    }
}
