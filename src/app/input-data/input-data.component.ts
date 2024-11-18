import { Component, Input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Task } from './input-data.model';
import { User } from '../app.component';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-input-data',
  standalone: true,
  imports: [FormsModule,NgClass],
  templateUrl: './input-data.component.html',
  styleUrl: './input-data.component.css'
})
export class InputDataComponent {

  @Input({required:true}) category!:string | null;
  add=output<Task[]>()

  users:User[]=[]
  tasks:Task[]=[]

  enteredName: string = '';
  date:Date|null=null
 
  handleSubmit(){
    this.users = JSON.parse(localStorage.getItem('users') || '[]') as User[];
    this.tasks=this.users[0].tasks
    const newTask: Task = {id:this.tasks.length+1, name: this.enteredName.charAt(0).toUpperCase() + this.enteredName.slice(1), status: false, category:this.category,  date:this.date ? new Date(this.date) : null };
    this.tasks.push(newTask)
    this.users[0].tasks=this.tasks
    this.enteredName = '';
    localStorage.setItem('users',JSON.stringify(this.users));
    this.add.emit(this.tasks)
    // this.router.navigate(['/task', this.category],{
    //   replaceUrl:true
    // })
  }

  //@Output() add = new EventEmitter<Task>();
  //category:string | null =""
  // private destroyRef=inject(DestroyRef)
  // private activatedRoute=inject(ActivatedRoute)
  // private router=inject(Router)
  
  // ngOnInit(): void {
  //   this.tasks = JSON.parse(localStorage.getItem('tasks') || '[]') as Task[];
  //   // const subsciption=this.activatedRoute.paramMap.subscribe({
  //   //   next:(paramMap)=>{
  //   //     this.tasks = JSON.parse(localStorage.getItem('tasks') || '[]') as Task[];
  //   //     this.category=paramMap.get('category');
  //   //   }
  //   // })
  //   // this.destroyRef.onDestroy(()=>subsciption.unsubscribe())
  // }

}
