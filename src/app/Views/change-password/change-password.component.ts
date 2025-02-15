import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { getAuth, updatePassword, reauthenticateWithCredential, EmailAuthProvider } from 'firebase/auth';
import { getFirestore, doc, updateDoc, getDoc } from 'firebase/firestore';
import { firebaseApp } from '../../firebase.config';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  
  user: any = { nombre: '', direccion: '', telefono: '' };
  currentPassword: string = '';
  newPassword: string = '';
  confirmPassword: string = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.loadUserData();
  }

  async loadUserData(): Promise<void> {
    const auth = getAuth(firebaseApp);
    const firestore = getFirestore(firebaseApp);
    const user = auth.currentUser;

    if (user) {
      const userDocRef = doc(firestore, 'users', user.uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        this.user = userDoc.data();
      } else {
        console.log('No se encontró el documento del usuario');
      }
    } else {
      console.log('Usuario no autenticado');
    }
  }

  async updateProfile(): Promise<void> {
    const auth = getAuth(firebaseApp);
    const firestore = getFirestore(firebaseApp);
    const user = auth.currentUser;

    if (!user) {
      console.log('Usuario no autenticado');
      return;
    }

    try {
      const userDocRef = doc(firestore, 'users', user.uid);
      await updateDoc(userDocRef, {
        nombre: this.user.nombre,
        direccion: this.user.direccion,
        telefono: this.user.telefono
      });

      console.log('Perfil actualizado correctamente');
    } catch (error) {
      console.error('Error al actualizar perfil:', error);
    }

    if (this.newPassword && this.newPassword === this.confirmPassword) {
      try {
        const credential = EmailAuthProvider.credential(user.email!, this.currentPassword);
        await reauthenticateWithCredential(user, credential);
        await updatePassword(user, this.newPassword);
        console.log('Contraseña actualizada correctamente');
      } catch (error) {
        console.error('Error al actualizar contraseña:', error);
      }
    } else if (this.newPassword) {
      console.error('Las contraseñas no coinciden');
    }
  }

  goBack(): void {
    this.router.navigate(['/config']);
  }
}
