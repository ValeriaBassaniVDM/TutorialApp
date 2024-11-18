import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { AppModule } from './app/app.module';

//se AppComponent fosse uno standalone component
// bootstrapApplication(AppComponent, {
//     providers: [
//         provideRouter(routes),
//     ],
// }).catch((err) => console.error(err));

platformBrowserDynamic().bootstrapModule(AppModule).catch((err) => console.error(err));

//platformBrowserDynamic().bootstrapModule(AppModule).catch(err => console.error(err));

