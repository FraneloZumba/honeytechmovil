import { Injectable } from '@angular/core';
import { LocalNotifications } from '@capacitor/local-notifications';

@Injectable({
  providedIn: 'root'
})
export class LocalNotificationService {

  constructor() { }

  // Método para solicitar permisos y programar una notificación
  async scheduleNotification(title: string, body: string) {
    await LocalNotifications.requestPermissions();  // Solicita permiso para las notificaciones

    await LocalNotifications.schedule({
      notifications: [
        {
          title: title,
          body: body,
          id: new Date().getTime(),  // Usamos el timestamp como ID único
          schedule: {
            at: new Date(new Date().getTime() + 5000) // Notificación después de 5 segundos
          },
          sound: 'default', // Sonido por defecto
        }
      ]
    });
  }
}
