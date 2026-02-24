import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { UserRolesEnum } from "../enums/user-roles.enum";
import { Task } from "src/tasks/entities/task.entity";

@Entity()
export class User {

    @PrimaryGeneratedColumn('increment', {
        name: 'user_id',
    })
    id: number;

    @Column('text', {
        nullable: false,
        name: 'user_name',
    })
    name: string;

    @Column({
        type: 'text',
        nullable: false,
        unique: true,
        name: 'user_email',
    })
    email: string;

    @Column({
        type: "text",
        nullable: false,
        default: UserRolesEnum.USER,
        name: 'user_role',
    })
    role: UserRolesEnum;

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
        () => Task,
        task => task.users,
    )
    tasks?: Task[];

}
