import { createReducer, on } from '@ngrx/store';
import { increment, decrement, reset } from './counter.actions';
import { add, remove } from './list.action';

export const initialState = 0;

export const counterReducer = createReducer(
  initialState,
  on(increment, (state) => state + 1),
  on(decrement, (state) => state - 1),
  on(reset, (state) => 0)
);

export const listInitialState:string[]=[]

export const listReducer=createReducer(
  listInitialState,
  on(add,(state,{task})=>[...state,task]),
  on(remove,(state,{task})=>state.filter(t => t !== task))
)