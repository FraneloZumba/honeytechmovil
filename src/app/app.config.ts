import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideFirebaseApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideDatabase, getDatabase } from '@angular/fire/database';
import { firebaseAuthApp, firebaseESPApp } from './firebase.config';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),

    // 🔑 Firebase para autenticación
    provideFirebaseApp(() => firebaseAuthApp),
    provideAuth(() => getAuth(firebaseAuthApp)),

    // 📡 Firebase para datos del ESP32 (Sensores)
    provideFirebaseApp(() => firebaseESPApp),
    provideDatabase(() => getDatabase(firebaseESPApp))
  ]
};
