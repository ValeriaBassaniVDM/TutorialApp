import { createAction, props } from '@ngrx/store';

export const add = createAction('[List Component] Add', props<{task:string}>());

export const remove = createAction('[List Component] Remove', props<{task:string}>());
