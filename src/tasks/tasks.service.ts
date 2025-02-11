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

    //Cria uma nova tarefa
    async createTask (createTaskDto: CreateTaskDto, userId: number): Promise<TaskEntity> {
        await this.usersService.findUserById(userId);

        return this.taskRepository.save({
            ...createTaskDto,
            userId
        });
    }
    
    //Busta todas as tarefas de um usuário
    async getAllTasks (userId: number): Promise<TaskEntity[]> {
        const tasks = await this.taskRepository.find({
            where: {
                userId
            }
        });

        return tasks;
    }

    //Busca uma task pelo id e pelo id do usuário
    async getTaskById(taskId: number, userId: number): Promise<TaskEntity> {
        const task = await this.taskRepository.findOne({
            where: {
                id: taskId,
                userId: userId
            }
        })

        if (!task) {
            throw new NotFoundException('Task not found');
        }

        return task;
    }

    //Atualiza uma tarefa
    async updateTask (taskId: number, updateTaskDto: UpdateTaskDto, userId: number): Promise<TaskEntity> {
        const task = await this.getTaskById(taskId, userId);

        return this.taskRepository.save({
            ...task,
            ...updateTaskDto
        });
    }

    //Deleta uma tarefa
    async deleteTask (taskId: number, userId: number): Promise<void> {
        const task = await this.getTaskById(taskId, userId);

        await this.taskRepository.delete(task.id);
    }
}
