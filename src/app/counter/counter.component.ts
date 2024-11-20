import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { decrement, increment, reset } from '../reducers/counter.actions';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-counter',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.css'
})
export class CounterComponent {
  count$:Observable<number>; 

  constructor(
    private store: Store<{ count: number }>
  ){
    this.count$ = store.select('count');
  }

  increment() {
    this.store.dispatch(increment());
    console.log(this.count$);
  }

  decrement() {
    this.store.dispatch(decrement());
  }

  reset() {
    this.store.dispatch(reset());
  }
}
