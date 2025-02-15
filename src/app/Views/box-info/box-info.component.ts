import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

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
    this.router.navigate(['/temp-interface']);
  }
  
  goToHumidity() {
    this.router.navigate(['/humidity-interface']);
  }
  
  goToWeight() {
    this.router.navigate(['/weight-interface']);
  }
  
  goToCam() {
    this.router.navigate(['/cam-interface']);
  }  
}
