import { Injectable } from "@angular/core";
import { Task } from "../input-data/input-data.model";

@Injectable({providedIn:'root'})
export class TaskDetailService{
    AddTask(newTask:Task, tasks:Task[]):Task[]{
        tasks?.push(newTask)
        return tasks
      }
    
      completeTask(task:Task, tasks:Task[]):Task[]{
        const index = tasks.findIndex(t => t.id === task.id);
        if (index !== -1) {
          tasks[index] = task;
        }
        return tasks
      }
    
      deleteTask(task:Task, tasks:Task[]):Task[]{
        tasks = tasks.filter(t => t.id !== task.id);
        return tasks
      }
}