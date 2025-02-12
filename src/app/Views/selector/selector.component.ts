import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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

  constructor(private router: Router) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.isLoaded = true;
    }, 2000);
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
}
