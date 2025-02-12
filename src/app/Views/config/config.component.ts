import { CommonModule } from '@angular/common';
import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { firebaseApp } from '../../firebase.config'; 

@Component({
  selector: 'app-selector',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})
export class ConfigComponent {

  user:any=null;
  
  constructor (private router: Router){}

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

  goToSelector(): void {
    this.router.navigate(['/selector']);
  }
}
