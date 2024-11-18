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
import { routes } from "./app.routes";

@NgModule({
    declarations:[AppComponent],
    bootstrap:[AppComponent],
    imports:[ApolloModule, HttpClientModule, BrowserModule,TaskDetailsComponent,MenuComponent, RouterModule.forRoot(routes),RouterOutlet],
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

