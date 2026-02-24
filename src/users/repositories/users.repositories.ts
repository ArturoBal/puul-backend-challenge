import { DataSource, In, Repository } from "typeorm";
import { User } from "../entities/user.entity";
import { Injectable } from "@nestjs/common";
import { GetAllUsersRequestDto } from "../dto/get-all-users-request.dto";
import { SelectQueryBuilder } from "typeorm/browser";
import { TaskStatusEnum } from "src/tasks/enums/task-status.enum";

@Injectable()
export class UsersCustomRepository extends Repository<User> {
    constructor(
        private dataSource: DataSource
    ) {
        super(User, dataSource.createEntityManager());
    }

    async getAllUsers(requestDto: GetAllUsersRequestDto): Promise<[User[], number]> {
        const { limit = 10, offset = 0, ...filters } = requestDto;

        const query = this.createQueryBuilder('user');

        query.leftJoinAndSelect('user.tasks', 'task', 'task.status = :status', { status: TaskStatusEnum.FINALIZED });

        await this.applyGetUsersFilters(filters, query);

        query.take(limit).skip(offset);

        const rawQuery = query.getQueryAndParameters();

        return query.getManyAndCount();
    }

    getUsersInArray(ids: number[]): Promise<[User[], number]> {
        return this.findAndCount({ where: { id: In(ids) } });
    }

    saveUser(userEntity: User): Promise<User> {
        return this.save(userEntity);
    }

    private async applyGetUsersFilters(filters: GetAllUsersRequestDto, query: SelectQueryBuilder<User>) {
        const { search, role } = filters;

        if (search) {
            query.andWhere(
                `(LOWER(user.name) LIKE :search OR user.email LIKE :search)`,
                { search: `%${search.toLowerCase()}%` },
            );
        }

        if (role) {
            query.andWhere('user.role = :role', { role });
        }
    }
}