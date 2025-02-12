import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms'; // Agregar FormsModule

@Component({
  selector: 'app-addbox',
  standalone: true,
  imports: [CommonModule, FormsModule], // Incluir FormsModule aquí
  templateUrl: './addbox.component.html',
  styleUrls: ['./addbox.component.css']
})
export class AddBoxComponent {
  isLoaded = true;
  boxName: string = '';
  boxDate: string = '';
  boxDescription: string = '';
  errorMessage: string | null = null;

  constructor(private router: Router) {}

  addBox(): void {
    if (!this.boxName || !this.boxDate || !this.boxDescription) {
      this.errorMessage = 'Todos los campos son obligatorios.';
      return;
    }

    // Aquí puedes agregar la lógica para guardar la caja (ejemplo: llamada a un servicio para agregar la caja a la base de datos)

    this.errorMessage = null;
    console.log('Caja añadida:', {
      boxName: this.boxName,
      boxDate: this.boxDate,
      boxDescription: this.boxDescription
    });

    // Redirigir a otro componente o hacer algo después de añadir la caja
    this.router.navigate(['/selector']);
  }
}
