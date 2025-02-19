import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { getFirestore, setDoc, doc } from 'firebase/firestore';
import { firebaseAuthApp } from '../../firebase.config';


@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [CommonModule, FormsModule]
})
export class LoginComponent implements OnInit {
  isLoaded: boolean = false;
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.isLoaded = true;
    }, 2000);
  }

  login() {
    const auth = getAuth(firebaseAuthApp ); // Usa la app inicializada
    signInWithEmailAndPassword(auth, this.email, this.password)
      .then(() => {
        this.router.navigate(['/selector']);
      })
      .catch((error) => {
        console.error('Error de autenticación:', error);
        this.errorMessage = 'Primero debe registrarse';
      });
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }

  // Login con Google
  async loginWithGoogle() {
    const auth = getAuth(firebaseAuthApp );
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log('Usuario logueado con Google:', user);

      const firestore = getFirestore(firebaseAuthApp );
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
