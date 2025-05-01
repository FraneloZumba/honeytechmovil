import { Component, OnInit, ElementRef, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, getDocs, doc, getDoc } from 'firebase/firestore';
import { firebaseAuthApp } from '../../firebase.config';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-adminselector',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './adminselector.component.html',
  styleUrls: ['./adminselector.component.css']
})
export class AdminSelectorComponent implements OnInit {
  activeTab: string = 'usuarios';
  cajas: any[] = [];
  user: any = null;

  constructor(
    private router: Router,
    private elRef: ElementRef,
    private renderer: Renderer2
  ) { }

  ngOnInit(): void {
    this.loadUserData();
    this.loadCajas();
  }

  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }

  async loadUserData(): Promise<void> {
    const auth = getAuth(firebaseAuthApp);
    const firestore = getFirestore(firebaseAuthApp);
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

  async loadCajas(): Promise<void> {
    const auth = getAuth(firebaseAuthApp);
    const firestore = getFirestore(firebaseAuthApp);
    const user = auth.currentUser;

    if (!user) {
      console.log('Usuario no autenticado');
      return;
    }

    // Si el usuario está autenticado, se consulta para todas las cajas
    const cajasSnapshot = await getDocs(collection(firestore, 'cajas'));
    const cajas = cajasSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    console.log('Cajas sin procesar:', cajas);

    const cajasConUsuario = await Promise.all(
      cajas.map(async (caja: any) => {
        const usuarioId = caja['usuarioId'];
        let propietario = {
          nombre: 'Desconocido',
          email: ''
        };

        if (usuarioId) {
          try {
            const userRef = doc(firestore, 'users', usuarioId);
            const userSnap = await getDoc(userRef);
            if (userSnap.exists()) {
              const userData = userSnap.data();
              propietario = {
                nombre: userData['nombre'] || 'Desconocido',
                email: userData['email'] || ''
              };
            }
          } catch (error) {
            console.error('Error obteniendo usuario:', error);
          }
        }

        return {
          ...caja,
          propietario
        };
      })
    );

    console.log('Cajas con propietario:', cajasConUsuario);

    this.cajas = cajasConUsuario;
  }

  goToLogin(): void {
    this.router.navigate(['/login']);
  }
}
