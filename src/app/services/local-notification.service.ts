import { Injectable } from '@angular/core';
import { LocalNotifications } from '@capacitor/local-notifications';

// Firebase
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { firebaseAuthApp } from '../firebase.config'; // Ajusta esta ruta según tu estructura

@Injectable({
  providedIn: 'root'
})
export class LocalNotificationService {

  constructor() {}

  async scheduleNotification(title: string, body: string) {
    await LocalNotifications.requestPermissions();

    const notification = {
      title,
      body,
      id: new Date().getTime(),
      date: new Date().toISOString()
    };

    // Enviar notificación local
    await LocalNotifications.schedule({
      notifications: [
        {
          title: notification.title,
          body: notification.body,
          id: notification.id,
          schedule: {
            at: new Date(new Date().getTime() + 5000)
          },
          sound: 'default',
        }
      ]
    });

    // Guardar en localStorage
    const stored = localStorage.getItem('notifications');
    const notifications = stored ? JSON.parse(stored) : [];
    notifications.unshift(notification);
    localStorage.setItem('notifications', JSON.stringify(notifications));

    // Guardar en Firestore
    await this.saveNotificationToFirestore(notification.title, notification.body);
  }

  getNotifications(): any[] {
    const stored = localStorage.getItem('notifications');
    return stored ? JSON.parse(stored) : [];
  }

  private async saveNotificationToFirestore(title: string, body: string): Promise<void> {
    const auth = getAuth(firebaseAuthApp);
    const firestore = getFirestore(firebaseAuthApp);
    const user = auth.currentUser;

    if (!user) {
      console.warn('Usuario no autenticado, no se guarda en Firestore');
      return;
    }

    const notification = {
      userId: user.uid,
      title,
      body,
      date: new Date(),
      read: false
    };

    try {
      await addDoc(collection(firestore, 'notifications'), notification);
    } catch (error) {
      console.error('Error guardando la notificación en Firestore:', error);
    }
  }
}
