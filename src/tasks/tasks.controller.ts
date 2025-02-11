import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TaskEntity } from './entities/task.entity';
import { AuthGuard } from 'src/guards/auth.guard';
import { UserId } from 'src/decorators/user-id.decorator';
import { CreateTaskDto } from './dto/create-task.dto';
import { ReturnTaskDto } from './dto/return-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('tasks')
@UseGuards(AuthGuard)
export class TasksController {

    constructor(
        private readonly tasksService: TasksService
    ) {}

    @Post()
    @UsePipes(ValidationPipe)
    async createTask(@Body() createTaskDto: CreateTaskDto, @UserId() userId: number): Promise<TaskEntity> {
        return this.tasksService.createTask(createTaskDto, userId);
    }
    
    @Get()
    async getAllTasks(@UserId() userId: number): Promise<ReturnTaskDto[]> {
        return (
            await this.tasksService.getAllTasks(userId)).map(task => new ReturnTaskDto(task)
        );
    }

    @Put(':taskId')
    @UsePipes(ValidationPipe)
    async updateTask(@Param('taskId') taskId: number, @Body() updateTaskDto: UpdateTaskDto, @UserId() userId: number): Promise<ReturnTaskDto> {
        return new ReturnTaskDto(
            await this.tasksService.updateTask(taskId, updateTaskDto, userId)
        );
    }

    @Delete(':taskId')
    async deleteTask(@Param('taskId') taskId: number, @UserId() userId: number): Promise<void> {
        return this.tasksService.deleteTask(taskId, userId);
    }
}
