import { createReducer, on } from '@ngrx/store';
import { setUser, unsetUser } from './auth.actions';
import { User } from '../../app.component';


const initialState: User = {
    id: null,
    name: null,
    lastname: null,
    tasks: []
};

export const authReducer = createReducer(
    initialState,
    on(setUser, (state,{user}) => ({
        ...state,
        id: user.id,
        name: user.name,
        lastname: user.lastname,
        tasks: user.tasks 
    })),
    on(unsetUser, ()=>({
        id: null,
        name: null,
        lastname: null,
        tasks: []
    }))
);

