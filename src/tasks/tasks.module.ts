import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { TaskEntity } from './entities/task.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([TaskEntity])],
  providers: [TasksService],
  controllers: [TasksController]
})
export class TasksModule {}
