import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-humidity-interface',
  templateUrl: './humidity-interface.component.html',
  styleUrl: './humidity-interface.component.css'
})
export class HumidityInterfaceComponent implements OnInit {

  public humed_ahora: Chart | null = null;
  public humed_semanal: Chart | null = null;
  public humed_mensual: Chart | null = null;
  public humed_anual: Chart | null = null;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.initCharts();
  }

  private initCharts() {
    // Datos para el gráfico de tiempo real
    const dataAhora = {
      labels: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'],
      datasets: [{
        label: 'Humedad Real',
        data: [80, 75, 70, 65, 75, 80, 70],
        fill: false,
        borderColor: 'rgb(255, 159, 64)',
        tension: 0.1
      }]
    };
    
    // Datos para el gráfico semanal
    const dataSemanal = {
      labels: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'],
      datasets: [{
        label: 'Humedad Semanal',
        data: [90, 75, 80, 65, 70, 55, 52],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }]
    };

    // Datos para el gráfico mensual
    const dataMensual = {
      labels: ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4'],
      datasets: [{
        label: 'Humedad Mensual',
        data: [60, 62, 65, 70],
        fill: false,
        borderColor: 'rgb(255, 99, 132)',
        tension: 0.1
      }]
    };

    // Datos para el gráfico anual
    const dataAnual = {
      labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
      datasets: [{
        label: 'Humedad Anual',
        data: [22, 25, 28, 30, 32, 35, 38, 37, 33, 28, 24, 20],
        fill: false,
        borderColor: 'rgb(54, 162, 235)',
        tension: 0.1
      }]
    };

    // Inicializar gráficos
    this.humed_ahora = new Chart("chart_ahora", {
      type: 'line',
      data: dataAhora
    });

    this.humed_semanal = new Chart("chart_semanal", {
      type: 'line',
      data: dataSemanal
    });

    this.humed_mensual = new Chart("chart_mensual", {
      type: 'line',
      data: dataMensual
    });

    this.humed_anual = new Chart("chart_anual", {
      type: 'line',
      data: dataAnual
    });
  }

  goToBoxInfo(): void {
    this.router.navigate(['/box-info', 'cajaNombre']);  // Cambia 'cajaNombre' por la variable que tengas
  }
}
