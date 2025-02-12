import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { firebaseApp } from '../../firebase.config'; 

@Component({
  selector: 'app-selector',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './selector.component.html',
  styleUrls: ['./selector.component.css']
})
export class SelectorComponent implements OnInit {
  activeTab: string = 'cajas';
  cajas: any[] = [{ id: 1, nombre: 'Caja 1' }];
  isLoaded: boolean = false;
  user: any = null;  // Para almacenar los datos del usuario

  constructor(private router: Router) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.isLoaded = true;
      this.loadUserData();  // Cargar los datos del usuario al iniciar
    }, 2000);
  }

  // Método para obtener los datos del usuario desde Firestore
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

  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }

  addCaja(): void {
    const container = document.querySelector('.cards-container');
    if (container) {
      container.classList.add('animating');
    }

    const nuevaCaja = {
      id: this.cajas.length + 1,
      nombre: `Caja ${this.cajas.length + 1}`
    };

    setTimeout(() => {
      this.cajas.push(nuevaCaja);
      if (container) {
        container.classList.remove('animating');
      }
    }, 500);
  }

  viewBoxInfo(cajaId: number): void {
    this.router.navigate(['/box-info', cajaId]);
  }

  goToUserInterface(): void {
    this.router.navigate(['/interface-user']);
  }

  goToChatbot(): void {
    this.router.navigate(['/chatbot']);
  }

  goToConfig(): void {
    this.router.navigate(['/config']);
  }

  goToAddBox(): void {
    this.router.navigate(['/addbox']);
  }
}
