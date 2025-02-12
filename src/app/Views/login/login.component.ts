import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

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
    const auth = getAuth(); // Se obtiene la instancia de autenticación de Firebase
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
}
