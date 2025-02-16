import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-cam-interface',
  imports: [],
  templateUrl: './cam-interface.component.html',
  styleUrl: './cam-interface.component.css'
})
export class CamInterfaceComponent implements OnInit {

  public cajaNombre: string = 'Desconocida';

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.cajaNombre = params.get('nombre') || 'Desconocida';
    });
  }

  goToBoxInfo(): void {
    this.router.navigate(['/box-info', this.cajaNombre]);
  }
}
