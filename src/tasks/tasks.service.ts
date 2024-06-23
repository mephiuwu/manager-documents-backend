import { Injectable, NotFoundException } from '@nestjs/common';

export interface Task {
  title: string;
  status: boolean;
}

@Injectable()
export class TasksService {
  private tasks = [
    {
      id: 1,
      title: 'Actualizar API Facebook Pixel',
      status: true,
    },
    {
      id: 2,
      title: 'Implementar PedidosYa',
      status: false,
    },
  ];

  getTasks() {
    return this.tasks;
  }

  getTask(id:number) {
    const taskFound = this.tasks.find(task => task.id === id);

    if(!taskFound) return new NotFoundException('Tarea no encontrada');
    
    return taskFound;
  }

  createTask(task: Task) {
    this.tasks.push({
        id: this.tasks.length + 1,
        ...task
    });
    return this.getTasks();
  }
}
