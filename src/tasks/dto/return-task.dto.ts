import { TaskEntity } from "../entities/task.entity";

export class ReturnTaskDto {
    id: number;
    title: string;
    description: string;
    status: string;

    constructor(task: TaskEntity) {
        this.id = task.id;
        this.title = task.title;
        this.description = task.description;
        this.status = task.status;
    }
}