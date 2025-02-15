import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { firebaseApp } from '../../firebase.config';

@Component({
  selector: 'app-addbox',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './addbox.component.html',
  styleUrls: ['./addbox.component.css']
})
export class AddBoxComponent {
  isLoaded = true;
  boxName: string = '';
  boxDate: string = '';
  errorMessage: string | null = null;

  constructor(private router: Router) {}

  async addBox(): Promise<void> {
    if (!this.boxName || !this.boxDate) {
      this.errorMessage = 'Todos los campos son obligatorios.';
      return;
    }

    // Guardar la caja en Firebase
    const firestore = getFirestore(firebaseApp);
    const cajasCollection = collection(firestore, 'cajas');

    try {
      await addDoc(cajasCollection, {
        nombre: this.boxName,
        fecha: this.boxDate,
      });

      this.errorMessage = null;
      console.log('Caja añadida:', { boxName: this.boxName, boxDate: this.boxDate});

      // Redirigir al selector
      this.router.navigate(['/selector']);
    } catch (error) {
      this.errorMessage = 'Error al añadir la caja. Intenta nuevamente.';
      console.error('Error al guardar la caja:', error);
    }
  }
}
