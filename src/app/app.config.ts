import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withViewTransitions()),
    provideFirebaseApp(() =>
      initializeApp({
        projectId: 'feedbapp-cl',
        appId: '1:338386821517:web:1a8d83d50edce40fb4ddc4',
        storageBucket: 'feedbapp-cl.firebasestorage.app',
        apiKey: 'AIzaSyAv79dtKyI4Glaj7O4OQBbLUHmYA5bsZRU',
        authDomain: 'feedbapp-cl.firebaseapp.com',
        messagingSenderId: '338386821517',
        measurementId: 'G-F2DVZ9NF2X',
      })
    ),
    provideAuth(() => getAuth()),
  ],
};
