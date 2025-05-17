import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { App as CapacitorApp } from '@capacitor/app';

bootstrapApplication(AppComponent, appConfig)
  .then(() => {
    CapacitorApp.addListener('backButton', ({ canGoBack }) => {
      if (window.history.length > 1) {
        window.history.back();
      } else {
        // Opcional: puedes mostrar un confirm para salir o simplemente ignorar
        // CapacitorApp.exitApp(); // Descomenta si deseas que cierre manualmente
        console.log('No hay historial, ignorando botón atrás');
      }
    });
  })
  .catch(err => console.error(err));
