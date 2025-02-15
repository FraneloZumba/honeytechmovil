import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';
import { firebaseApp } from '../../firebase.config';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

@Component({
  selector: 'app-selector',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})
export class ConfigComponent implements OnInit {
  user: any = null;
  @ViewChild('fileInput') fileInput: any;

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

  async onFileSelected(event: any): Promise<void> {
    const file = event.target.files[0];
    if (file) {
      // Subir archivo a Firebase Storage
      const storage = getStorage(firebaseApp);
      const storageRef = ref(storage, 'profile-images/' + file.name);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          // Aquí puedes agregar un progreso de carga si lo deseas
        },
        (error) => {
          console.error('Error al cargar la imagen:', error);
        },
        async () => {
          // Obtener la URL de la imagen cargada
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          // Actualizar la URL de la imagen en Firestore
          await this.updateProfileImage(downloadURL);
        }
      );
    }
  }

  async updateProfileImage(imageUrl: string): Promise<void> {
    const auth = getAuth(firebaseApp);
    const firestore = getFirestore(firebaseApp);
    const user = auth.currentUser;

    if (user) {
      const userDocRef = doc(firestore, 'users', user.uid);
      // Actualizar la URL de la imagen en Firestore
      await updateDoc(userDocRef, {
        profileImageUrl: imageUrl,
      });
      this.user.profileImageUrl = imageUrl; // Actualizar la imagen en el front-end
    }
  }

  goToSelector(): void {
    this.router.navigate(['/selector']);
  }

  goToChangePassword(): void {
    this.router.navigate(['/change-password']);
  }

  goToLogin(): void {
    this.router.navigate(['/login']);
  }
}
