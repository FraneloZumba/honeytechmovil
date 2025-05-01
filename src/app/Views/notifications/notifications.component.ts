import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, onSnapshot, query, where } from 'firebase/firestore';
import { firebaseAuthApp } from '../../firebase.config';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {
  notifications: any[] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.loadNotifications();
  }

  loadNotifications(): void {
    const auth = getAuth(firebaseAuthApp);
    const user = auth.currentUser;

    if (!user) {
      console.log('Usuario no autenticado');
      return;
    }

    const firestore = getFirestore(firebaseAuthApp);
    const notificationsCollection = collection(firestore, 'notifications');
    const q = query(notificationsCollection, where('userId', '==', user.uid));

    onSnapshot(q, (snapshot) => {
      this.notifications = snapshot.docs.map(doc => doc.data());
    });
  }

  goToSelector(): void {
    this.router.navigate(['/selector']);
  }
}
