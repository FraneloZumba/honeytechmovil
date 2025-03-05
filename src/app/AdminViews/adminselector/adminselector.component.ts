import { Component, OnInit, OnDestroy, ElementRef, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, getDocs, doc, getDoc, query, where } from 'firebase/firestore';
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
  activeTab: string = 'usuarios'; // Inicializa la pestaña activa en 'usuarios'
  cajas: any[] = []; // Array de cajas (usuarios)
  userMessage: string = ''; // Mensaje del usuario para el chatbot (si es necesario)
  messages: any[] = []; // Mensajes para el chatbot (si es necesario)
  user: any = null; // Información del usuario autenticado
  chatScriptLoaded: boolean = false; // Estado de carga del script del chatbot

  constructor(
    private router: Router,
    private elRef: ElementRef,
    private renderer: Renderer2
  ) { }

  ngOnInit(): void {
    this.loadUserData(); // Carga la información del usuario al inicializar
    this.loadCajas(); // Carga las cajas (usuarios)
  }

  // Método para establecer la pestaña activa
  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }

  // Método para cargar los datos del usuario desde Firebase
  async loadUserData(): Promise<void> {
    const auth = getAuth(firebaseAuthApp); // Obtén la autenticación de Firebase
    const firestore = getFirestore(firebaseAuthApp); // Obtén la instancia de Firestore
    const user = auth.currentUser; // Obtén el usuario actual autenticado

    if (user) {
      const userDocRef = doc(firestore, 'users', user.uid); // Obtén el documento del usuario desde Firestore
      const userDoc = await getDoc(userDocRef); // Obtén el documento de usuario

      if (userDoc.exists()) {
        this.user = userDoc.data(); // Si el documento existe, asigna los datos del usuario
      } else {
        console.log('No se encontró el documento del usuario');
      }
    } else {
      console.log('Usuario no autenticado');
    }
  }

  // Método para cargar las cajas (usuarios) desde Firebase
  async loadCajas(): Promise<void> {
    const auth = getAuth(firebaseAuthApp); // Obtén la autenticación de Firebase
    const user = auth.currentUser; // Obtén el usuario actual autenticado

    if (!user) {
      console.log('Usuario no autenticado');
      return;
    }

    const firestore = getFirestore(firebaseAuthApp); // Obtén la instancia de Firestore
    const cajasCollection = collection(firestore, 'cajas'); // Obtén la colección de cajas

    // Filtrar cajas por el usuario actual
    const q = query(cajasCollection, where('usuarioId', '==', user.uid));
    const querySnapshot = await getDocs(q); // Realiza la consulta a Firestore

    this.cajas = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })); // Asigna las cajas a la variable
  }

  // Método para añadir un usuario (si es necesario)
  addUsuario(): void {
    console.log('Añadir Usuario');
    // Aquí puedes agregar la lógica para añadir un usuario
  }

  // Método para eliminar un usuario (si es necesario)
  deleteUsuario(): void {
    console.log('Eliminar Usuario');
    // Aquí puedes agregar la lógica para eliminar un usuario
  }

  goToLogin(): void {
    this.router.navigate(['/login']);
  }
}
