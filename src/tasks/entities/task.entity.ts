import { UserEntity } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'task' })
export class TaskEntity {
  @PrimaryGeneratedColumn('rowid')
  id: number;

  @Column({ name: 'title', nullable: false })
  title: string;

  @Column({ name: 'description', nullable: false })
  description: string;

  @Column({ name: 'status', nullable: false })
  status: string;

  @Column({ name: 'user_id', nullable: false })
  userId: number;

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;

  @ManyToOne(() => UserEntity, (user) => user.tasks)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: UserEntity;
}