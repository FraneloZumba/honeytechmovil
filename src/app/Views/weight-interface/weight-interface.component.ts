import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Chart } from 'chart.js/auto';
import { getDatabase, ref, onValue } from 'firebase/database';
import { firebaseESPApp } from '../../firebase.config';
import { LocalNotificationService } from '../../services/local-notification.service'; // Asegúrate de importar el servicio

@Component({
  selector: 'app-weight-interface',
  templateUrl: './weight-interface.component.html',
  styleUrls: ['./weight-interface.component.css']
})
export class WeightInterfaceComponent implements AfterViewInit, OnDestroy {

  public peso_ahora: Chart | null = null;
  public peso_semanal: Chart | null = null;
  public peso_mensual: Chart | null = null;
  public peso_anual: Chart | null = null;

  private pesoDataArray: number[] = new Array(20).fill(0); // Valores iniciales
  private interval: any;

  constructor(private router: Router, private localNotificationService: LocalNotificationService) {}

  ngAfterViewInit(): void {
    this.initCharts();
    this.listenToRealtimeWeight();
  }

  ngOnDestroy(): void {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  private listenToRealtimeWeight() {
    const db = getDatabase(firebaseESPApp);
    const weightRef = ref(db, 'tiempo_real');

    onValue(weightRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const peso = Math.abs(data.weight);
        this.updateRealtimeChart(peso);

        // Notificación si el peso supera 2.5kg
        if (peso > 2.5) {
          this.localNotificationService.scheduleNotification('¡Miel lista!', `El peso actual es de ${peso} kg. Los marcos ya podrían estar listos para cosecha.`);
        }
      }
    });
  }

  private updateRealtimeChart(newWeight: number) {
    // Elimina el primer valor y agrega el nuevo
    this.pesoDataArray.shift();
    this.pesoDataArray.push(newWeight);

    if (this.peso_ahora) {
      this.peso_ahora.data.datasets![0].data = this.pesoDataArray;
      this.peso_ahora.update();
    }
  }

  private initCharts() {
    const ctxAhora = document.getElementById('chart_ahora') as HTMLCanvasElement;
    const ctxSemanal = document.getElementById('chart_semanal') as HTMLCanvasElement;
    const ctxMensual = document.getElementById('chart_mensual') as HTMLCanvasElement;
    const ctxAnual = document.getElementById('chart_anual') as HTMLCanvasElement;

    // Tiempo real
    this.peso_ahora = new Chart(ctxAhora, {
      type: 'line',
      data: {
        labels: new Array(20).fill(''), // Sin etiquetas
        datasets: [{
          label: 'Peso Real',
          data: this.pesoDataArray,
          borderColor: '#F67280',
          borderWidth: 2,
          fill: false,
          tension: 0.4, // Suavidad estilo "latido"
          pointRadius: 0
        }]
      },
      options: {
        animation: false,
        responsive: true,
        scales: {
          x: { display: false },
          y: {
            beginAtZero: true,
            ticks: { color: '#666' },
            grid: { color: '#ddd' }
          }
        },
        plugins: {
          legend: { display: false }
        }
      }
    });

    // Semanal
    this.peso_semanal = new Chart(ctxSemanal, {
      type: 'line',
      data: {
        labels: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'],
        datasets: [{
          label: 'Peso Semanal',
          data: [80, 75, 70, 65, 75, 80, 70],
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.3,
          fill: false
        }]
      }
    });

    // Mensual
    this.peso_mensual = new Chart(ctxMensual, {
      type: 'line',
      data: {
        labels: ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4'],
        datasets: [{
          label: 'Peso Mensual',
          data: [60, 62, 65, 70],
          borderColor: 'rgb(255, 99, 132)',
          tension: 0.3,
          fill: false
        }]
      }
    });

    // Anual
    this.peso_anual = new Chart(ctxAnual, {
      type: 'line',
      data: {
        labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
        datasets: [{
          label: 'Peso Anual',
          data: [15, 20, 28, 50, 80, 15, 45, 30, 50, 28, 40, 80],
          borderColor: 'rgb(54, 162, 235)',
          tension: 0.3,
          fill: false
        }]
      }
    });
  }

  goToBoxInfo(): void {
    this.router.navigate(['/box-info', 'cajaNombre']);
  }
}
