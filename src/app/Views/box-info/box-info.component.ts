import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Capacitor } from '@capacitor/core';

@Component({
  selector: 'app-box-info',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './box-info.component.html',
  styleUrls: ['./box-info.component.css']
})
export class BoxInfoComponent implements OnInit {
  cajaNombre: string = 'Desconocida';

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.cajaNombre = params.get('nombre') || 'Desconocida';
    });
  }

  goToSelector(): void {
    this.router.navigate(['/selector']);
  }

  goToTemp() {
    this.router.navigate(['/temp-interface', this.cajaNombre]);
  }  
  
  goToHumidity() {
    this.router.navigate(['/humidity-interface', this.cajaNombre]);
  }
  
  goToWeight() {
    this.router.navigate(['/weight-interface', this.cajaNombre]);
  }
  goToCam() {
    const faleemiUrl = 'faleemi://'; // Reemplaza con el esquema de URL real si lo obtienes
    const appStoreUrl = 'https://apps.apple.com/us/app/faleemi-cloud/id1525487402';
    const playStoreUrl = 'https://play.google.com/store/apps/details?id=net.ajcloud.faleemi';
  
    if (Capacitor.isNativePlatform()) {
      // Intenta abrir la aplicación Faleemi
      window.location.href = faleemiUrl;
      setTimeout(() => {
        // Si la aplicación no se abre, redirige a la tienda de aplicaciones correspondiente
        if (navigator.userAgent.includes('iPhone') || navigator.userAgent.includes('iPad')) {
          window.location.href = appStoreUrl;
        } else if (navigator.userAgent.includes('Android')) {
          window.location.href = playStoreUrl;
        }
      }, 1000); // Espera 1 segundo para verificar si la aplicación se abrió
    } else {
      // Si no es una plataforma nativa, redirige a la página web de Faleemi
      window.open('https://faleemi.com/', '_blank');
    }
  }
}
