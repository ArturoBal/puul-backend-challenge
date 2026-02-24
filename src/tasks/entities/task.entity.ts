import { User } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { TaskStatusEnum } from "../enums/task-status.enum";

@Entity()
export class Task {

    @PrimaryGeneratedColumn('increment', {
        name: 'task_id'
    })
    id: number;

    @Column({
        name: 'task_name',
        unique: false,
    })
    title: string;

    @Column({
        name: 'task_description'
    })
    description: string;

    @Column({
        name: 'task_estimated_hours'
    })
    estimatedHours: number;

    @Column({
        name: 'task_expiration_date'
    })
    expirationDate: Date;

    @Column({
        name: 'task_status',
        default: TaskStatusEnum.ACTIVE
    })
    status: TaskStatusEnum;

    @Column({
        name: 'task_cost',
        type: 'decimal',
        precision: 10,
        scale: 2,
    })
    cost: number;

    @CreateDateColumn({
        name: 'created_at',
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
    })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    @DeleteDateColumn({ name: 'deleted_at', nullable: true })
    deletedAt?: Date;

    @ManyToMany(
        () => User,
        user => user.tasks,
    )
    @JoinTable({
        name: 'tasks_users',
    })
    users?: User[];
}
