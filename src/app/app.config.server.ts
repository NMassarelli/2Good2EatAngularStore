import { BrowserStorageServerService } from './shared/services/browser-service/browser-storage-server/browser-storage-server.service';
import { mergeApplicationConfig, ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.config';
import { provideHttpClient, withFetch, withJsonpSupport } from '@angular/common/http';

import { environment } from '../environments/environment';
import { provideImageKitLoader } from '@angular/common';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { routes } from './app.routes';
import { BrowserStorageService } from './shared/services/browser-service/browser-storage.service';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),
    provideHttpClient(withFetch(), withJsonpSupport()),
    provideImageKitLoader(environment.urlEndpoint),
    provideRouter(routes, withComponentInputBinding()),
    {provide: BrowserStorageService,
      useClass:BrowserStorageServerService
    }
  ]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
