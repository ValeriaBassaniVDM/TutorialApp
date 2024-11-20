import { Routes } from '@angular/router';
import { TaskDetailsComponent } from './task-details/task-details.component';
import { InputDataComponent } from './input-data/input-data.component';
import { AuthComponent } from './auth/auth.component';
import { SigninComponent } from './signin/signin.component';
import { AuthGard } from './auth/auth.guard';
import { FilmsDetailsComponent } from './films-details/films-details.component';
import { FilmsGuard } from './films/films.guard';

export const routes: Routes = [
    {
        path: 'task/:product',
        component: TaskDetailsComponent,
        canActivate:[AuthGard],
        children: [
            { path: 'addtask/:category', component: InputDataComponent }
        ]
    },
    { path: 'auth', component: AuthComponent },
    { path: 'signin', component: SigninComponent },
    {
        path: 'character/:id',
        component: FilmsDetailsComponent,
        canActivate:[FilmsGuard],
    },
];
