import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-selector',
  imports: [CommonModule],
  templateUrl: './selector.component.html',
  styleUrl: './selector.component.css'
})
export class SelectorComponent {
  activeTab: string = 'cajas';

  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }
}
