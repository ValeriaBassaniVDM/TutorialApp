import { inject, NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { TaskDetailsComponent } from "./task-details/task-details.component";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule, RouterOutlet } from "@angular/router";
import { MenuComponent } from "./menu/menu.component";
import { HttpClientModule } from "@angular/common/http";
import { APOLLO_OPTIONS, ApolloModule } from "apollo-angular";
import { HttpLink } from "apollo-angular/http";
import { InMemoryCache } from "@apollo/client/core";
import { FilmsComponent } from "./films/films.component";
import { StoreModule } from '@ngrx/store';
import { counterReducer } from "./counter/reducer/counter.reducer";
import { routes } from "./app.routes";
import { HomepageComponent } from "./homepage/homepage.component";
import { listReducer } from "./state-list/reducer/list.reducer";
import { authReducer } from "./auth/reducer/auth.reducer";

@NgModule({
    declarations:[AppComponent],
    bootstrap:[AppComponent],
    imports: [
    HomepageComponent,
    ApolloModule,
    HttpClientModule,
    BrowserModule,
    TaskDetailsComponent,
    MenuComponent,
    RouterModule.forRoot(routes),
    StoreModule.forRoot({
        count: counterReducer,
        list: listReducer,
        user: authReducer
    }),
    RouterOutlet,
    FilmsComponent,
    HomepageComponent
],
    exports: [RouterModule],
    providers: [
        {
            provide: APOLLO_OPTIONS,
            useFactory: function () {
                const httpLink = inject(HttpLink);
                return {
                    link: httpLink.create({ uri: 'https://swapi-graphql.netlify.app/.netlify/functions/index' }),
                    cache: new InMemoryCache(),
                };
            },
            deps: [HttpLink],
        },
    ],
})

export class AppModule{}

