import { Controller, Get, Param } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TaskEntity } from './entities/task.entity';

@Controller('tasks')
export class TasksController {

    constructor(
        private readonly tasksService: TasksService
    ) {}

    @Get('/:userId')
    async getAllTasks(@Param('userId') userId: number): Promise<TaskEntity[]> {
        return this.tasksService.getAllTasks(userId);
    }
}
