import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskEntity } from './entities/task.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TasksService {

    constructor(
        @InjectRepository(TaskEntity)
        private readonly taskRepository: Repository<TaskEntity>
    ) {}

    async getAllTasks (userId: number): Promise<TaskEntity[]> {
        const tasks = await this.taskRepository.find({
            where: {
                userId
            }
        });

        return tasks;
    }
}
