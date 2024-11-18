import { Component, DestroyRef, inject, OnInit, output } from '@angular/core';
import { InputDataComponent } from '../input-data/input-data.component';
import { FormsModule } from '@angular/forms';
import { DatePipe, NgFor, NgIf } from '@angular/common';
import { Task } from '../input-data/input-data.model';
import { ActivatedRoute } from '@angular/router';
import { User } from '../app.component';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-task-details',
  standalone: true,
  imports: [FormsModule, NgIf, NgFor, InputDataComponent, DatePipe],
  templateUrl: './task-details.component.html',
  styleUrl: './task-details.component.css'
})

export class TaskDetailsComponent implements OnInit {
  //@Input({ required: true }) tasks!: Task[]; 
  //@Input({ required: true }) category!: string; 
  add = output<Task[]>()

  //tasks:Task[]=[]
  completedTasks: Task[] = [];
  uncompletedTasks: Task[] = [];
  expiringTasks: Task[] = []
  expiring: number = 0
  users: User[] = []

  category: string | null = ""
  private destroyRef = inject(DestroyRef)
  private activatedRoute = inject(ActivatedRoute)

  user: User | undefined;
  constructor(private authService: AuthService) { }

  userIndex: number = 0

  ngOnInit(): void {
    this.authService.getUserObservable().subscribe(user => {
      this.user = user;
    });

    const subsciption = this.activatedRoute.paramMap.subscribe({
      next: (paramMap) => {
        this.users = JSON.parse(localStorage.getItem('users') || '[]') as User[];
        this.userIndex = this.users.findIndex(u => u.id === this.user!.id);
        this.category = paramMap.get('category');
        this.filterTasksByCategory();
      }
    })
    this.destroyRef.onDestroy(() => subsciption.unsubscribe())
  }
  
  private countExpiring(tasks: Task[]) {
    const currentDate = new Date();
    this.expiringTasks = tasks.filter(task => {
      const taskDate = new Date(task.date!);
      const differenceInMs = taskDate.getTime() - currentDate.getTime();
      const daysDiff = Math.round(differenceInMs / (24 * 60 * 60 * 1000));
      return daysDiff >= 0 && daysDiff < 2;
    });
    this.uncompletedTasks = tasks.filter(task => !this.expiringTasks.includes(task));
    this.expiring = this.expiringTasks.length;
  }

  private filterTasksByCategory(): void {
    this.expiringTasks=[]
    if (this.category) {
      const filteredTasks = this.users[this.userIndex].tasks.filter(task => task.category === this.category);
      this.completedTasks = filteredTasks.filter(task => task.status === true);
      this.uncompletedTasks = filteredTasks.filter(task => task.status === false);
      this.countExpiring(this.uncompletedTasks)
    }
    this.uncompletedTasks=this.orderByDate(this.uncompletedTasks)
    this.completedTasks=this.orderByDate(this.completedTasks)
    this.expiringTasks=this.orderByDate(this.expiringTasks)    
  }

  private orderByDate(tasks:Task[]):Task[] {
    return tasks.sort((a, b) => new Date(b.date!).getTime() - new Date(a.date!).getTime());
  }

  AddTask(newTasks: Task[]) {
    this.users[this.userIndex].tasks = newTasks
    this.filterTasksByCategory()
  }

  onChangeTask(task: Task) {
    const i = this.users[this.userIndex].tasks.findIndex(t => t.id === task.id);
    if (i !== -1) {
      this.users[this.userIndex].tasks[i].status = task.status;
      if (task.status) {
        console.log(task);
        this.completedTasks = this.completedTasks.filter(t => t.id !== task.id);
        this.uncompletedTasks.push({ ...this.users[this.userIndex].tasks[i] })
      } else {
        console.log(task);
        this.completedTasks.push({ ...this.users[this.userIndex].tasks[i] })
        this.uncompletedTasks = this.uncompletedTasks.filter(t => t.id !== task.id);
      }
    }
    localStorage.setItem('users', JSON.stringify(this.users));
  }

  deleteTask(task: Task) {
    this.users[this.userIndex].tasks = this.users[this.userIndex].tasks.filter(t => t.id !== task.id);
    this.uncompletedTasks = this.uncompletedTasks.filter(t => t.id !== task.id);
    this.completedTasks = this.completedTasks.filter(t => t.id !== task.id);
    localStorage.setItem('users', JSON.stringify(this.users));
    this.filterTasksByCategory()
  }

  //SE USO UN FILE SERVICE
  // AddTask(newTask:Task){
  //   this.add.emit(this.taskDetailsService.AddTask(newTask,this.tasks));
  // }

  // completeTask(task:Task){
  //   this.taskDetailsService.completeTask(task,this.tasks)
  // }

  // deleteTask(task:Task){
  //   this.add.emit(this.taskDetailsService.deleteTask(task,this.tasks));
  // }
}
