import { createReducer, on } from '@ngrx/store';
import { add, remove } from './list.action';

export const listInitialState:string[]=[]

export const listReducer=createReducer(
  listInitialState,
  on(add,(state,{task})=>[...state,task]),
  on(remove,(state,{task})=>state.filter(t => t !== task))
)