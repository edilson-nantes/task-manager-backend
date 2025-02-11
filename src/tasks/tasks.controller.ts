import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TaskEntity } from './entities/task.entity';
import { AuthGuard } from 'src/guards/auth.guard';
import { UserId } from 'src/decorators/user-id.decorator';

@Controller('tasks')
@UseGuards(AuthGuard)
export class TasksController {

    constructor(
        private readonly tasksService: TasksService
    ) {}

    @Get()
    async getAllTasks(@UserId() userId: number): Promise<TaskEntity[]> {
        return this.tasksService.getAllTasks(userId);
    }
}
