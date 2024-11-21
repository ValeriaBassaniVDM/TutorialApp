import { Routes } from '@angular/router';
import { TaskDetailsComponent } from './task-details/task-details.component';
import { AuthComponent } from './auth/auth.component';
import { AuthGard } from './auth/auth.guard';
import { FilmsDetailsComponent } from './films-details/films-details.component';
import { FilmsGuard } from './films/films.guard';
import { MenuComponent } from './menu/menu.component';
import { FilmsComponent } from './films/films.component';
import { StateListComponent } from './state-list/state-list.component';

export const routes: Routes = [
    { 
        path:'taskmenu', 
        component: MenuComponent,
        canActivate:[AuthGard],
        children:[
            { path: 'task/:category', component: TaskDetailsComponent}
        ]
    },
    { path: 'auth', component: AuthComponent },
    { 
        path: 'starwars', 
        component: FilmsComponent,
        children:[
            {
                path: 'character/:id',
                component: FilmsDetailsComponent,
                canActivate:[FilmsGuard],
            },
        ]},
    { path: 'state', component: StateListComponent},
];
