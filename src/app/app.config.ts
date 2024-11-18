import { ApplicationConfig, inject } from '@angular/core';
import { provideRouter, withComponentInputBinding, withRouterConfig } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withFetch } from '@angular/common/http';

import { HttpLink } from 'apollo-angular/http';
import { APOLLO_NAMED_OPTIONS, APOLLO_OPTIONS, provideApollo } from 'apollo-angular';
import { InMemoryCache } from '@apollo/client/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app.module';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes,withComponentInputBinding(),withRouterConfig({
      paramsInheritanceStrategy:'always',
    })),
    provideHttpClient(withFetch()),
  ]
};


