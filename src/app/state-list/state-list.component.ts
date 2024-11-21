import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { add, remove } from './reducer/list.action';
import { FormsModule } from '@angular/forms';
import { CounterComponent } from "../counter/counter.component";

@Component({
  selector: 'app-state-list',
  standalone: true,
  imports: [NgFor, NgIf, AsyncPipe, FormsModule, CounterComponent, CounterComponent],
  templateUrl: './state-list.component.html',
  styleUrl: './state-list.component.css'
})
export class StateListComponent {

  list:Observable<string[]>

  task:string=""

  constructor(private store: Store<{ list: string[] }>){this.list = store.select('list');}

  onAdd(){
    this.store.dispatch(add({task:this.task}))
  }

  onRemove(){
    this.store.dispatch(remove({task:this.task}))
  }

}
