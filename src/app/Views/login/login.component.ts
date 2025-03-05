import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
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
    const auth = getAuth(firebaseAuthApp); // Usa la app inicializada
    signInWithEmailAndPassword(auth, this.email, this.password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        const firestore = getFirestore(firebaseAuthApp);
        const userDoc = doc(firestore, 'users', user.uid);
        const userDocSnapshot = await getDoc(userDoc);

        if (userDocSnapshot.exists()) {
          const userData = userDocSnapshot.data();
          const userRole = userData['role']; 

          if (userRole === 'admin') {
            // Si el rol es 'admin', redirige al componente adminselector
            this.router.navigate(['/AdminViews/adminselector']);
          } else {
            // Si no es admin, redirige al selector normal
            this.router.navigate(['/selector']);
          }
        } else {
          console.error('El usuario no tiene rol asignado');
          this.errorMessage = 'Error al obtener el rol del usuario';
        }
      })
      .catch((error) => {
        console.error('Error de autenticación:', error);
        this.errorMessage = 'Primero debe registrarse';
      });
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }
}
