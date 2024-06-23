import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('/tasks')
export class TasksController {
    tasksService:TasksService

    constructor(tasksService:TasksService) {
        this.tasksService = tasksService;
    }

    @Get()
	getAllTasks(){
		return this.tasksService.getTasks();
	}

    @Get('/:id')
	getAllTask(@Param('id') id:string){
		return this.tasksService.getTask(parseInt(id));
	}

    @Post()
    createTask(@Body() task: CreateTaskDto) {
        return this.tasksService.createTask(task);
    }

    @Put()
    updateTask(@Body() task: UpdateTaskDto) {
        return 'Actualizando tarea';
    }

    @Delete()
    deleteTask(){
        return 'Borrando tarea';
    }

    @Patch()
    updateTaskStatus() {
        return 'Actualizando status'
    }
}
