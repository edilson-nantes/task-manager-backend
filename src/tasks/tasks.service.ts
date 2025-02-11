import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskEntity } from './entities/task.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {

    constructor(
        @InjectRepository(TaskEntity)
        private readonly taskRepository: Repository<TaskEntity>,
        private readonly usersService: UsersService,
    ) {}

    async createTask (createTaskDto: CreateTaskDto, userId: number): Promise<TaskEntity> {
        await this.usersService.findUserById(userId);

        return this.taskRepository.save({
            ...createTaskDto,
            userId
        });
    }
    
    async getAllTasks (userId: number): Promise<TaskEntity[]> {
        const tasks = await this.taskRepository.find({
            where: {
                userId
            }
        });

        return tasks;
    }

    async updateTask (taskId: number, updateTaskDto: UpdateTaskDto, userId: number): Promise<TaskEntity> {
        await this.usersService.findUserById(userId);

        const task = await this.taskRepository.findOne({
            where: {
                id: taskId
            }
        });

        if (!task) {
            throw new NotFoundException('Task not found');
        }

        return this.taskRepository.save({
            ...task,
            ...updateTaskDto
        });
    }

    async deleteTask (taskId: number, userId: number): Promise<void> {
        await this.usersService.findUserById(userId);

        const task = await this.taskRepository.findOne({
            where: {
                id: taskId
            }
        });

        if (!task) {
            throw new NotFoundException('Task not found');
        }

        await this.taskRepository.delete(taskId);
    }
}
