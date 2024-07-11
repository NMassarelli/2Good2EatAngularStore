import { mergeApplicationConfig, ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.config';
import { provideHttpClient, withFetch, withJsonpSupport } from '@angular/common/http';

import { ImagekitioAngularModule } from 'imagekitio-angular';
import { environment } from '../environments/environment';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),
    provideHttpClient(withFetch(), withJsonpSupport()),
    importProvidersFrom(ImagekitioAngularModule.forRoot({
      publicKey: environment.publicKey,
      urlEndpoint: environment.urlEndpoint,
    }))
  ]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
