import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { getFirestore, setDoc, doc } from 'firebase/firestore';
import { firebaseApp } from '../../firebase.config';

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  imports: [RouterModule, CommonModule, FormsModule],
})
export class RegisterComponent implements OnInit {
  isLoaded: boolean = false;
  errorMessage: string = '';
  registrationSuccess: boolean = false; // Variable para controlar el estado del mensaje

  // Propiedades para los datos del formulario
  email: string = '';
  password: string = '';
  nombre: string = '';
  telefono: string = '';
  direccion: string = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.isLoaded = true;
    }, 2000);
  }

  async registrarse(): Promise<void> {
    const auth = getAuth(firebaseApp); // Usa la app inicializada
    const firestore = getFirestore(firebaseApp);

    try {
      // Registrar usuario en Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, this.email, this.password);
      const user = userCredential.user;

      // Guardar datos adicionales en Firestore
      const userDoc = doc(firestore, 'users', user.uid);
      await setDoc(userDoc, {
        uid: user.uid,
        email: this.email,
        nombre: this.nombre,
        telefono: this.telefono,
        direccion: this.direccion,
        createdAt: new Date(),
      });

      console.log('Usuario registrado y datos guardados en Firestore:', user.uid);

      // Cambiar el estado a éxito y mostrar el mensaje
      this.registrationSuccess = true;
      this.errorMessage = ''; // Limpiar el mensaje de error

      // Después de unos segundos, redirigir al login
      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 2000);
      
    } catch (error: any) {
      console.error('Error al registrarse:', error);
      this.errorMessage = error.message || 'Error desconocido';
      this.registrationSuccess = false;
    }
  }

  // Login con Google
  async loginWithGoogle() {
    const auth = getAuth(firebaseApp);
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log('Usuario logueado con Google:', user);

      const firestore = getFirestore(firebaseApp);
      const userDoc = doc(firestore, 'users', user.uid);
      await setDoc(userDoc, {
        uid: user.uid,
        email: user.email,
        nombre: user.displayName,
        createdAt: new Date(),
      });

      this.router.navigate(['/selector']);
    } catch (error: any) {
      console.error('Error al loguearse con Google:', error);
      this.errorMessage = 'Error de autenticación con Google';
    }
  }
}
