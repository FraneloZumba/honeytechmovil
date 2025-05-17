import { Component, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Chart } from 'chart.js/auto';
import { getDatabase, ref, onValue } from 'firebase/database';
import { firebaseESPApp } from '../../firebase.config';
import { LocalNotificationService } from '../../services/local-notification.service'; // Asegúrate de importar el servicio

@Component({
  selector: 'app-temp-interface',
  templateUrl: './temp-interface.component.html',
  styleUrls: ['./temp-interface.component.css']
})
export class TempInterfaceComponent implements AfterViewInit {
  public temp_ahora: Chart | null = null;
  public temp_semanal: Chart | null = null;
  public temp_mensual: Chart | null = null;
  public temp_anual: Chart | null = null;
  public tempData: number = 0;  // Almacenamos la temperatura recibida de Firebase
  public cajaNombre: string = 'Desconocida';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private localNotificationService: LocalNotificationService // Inyecta el servicio de notificaciones
  ) {}

  ngAfterViewInit(): void {
    this.route.paramMap.subscribe(params => {
      this.cajaNombre = params.get('nombre') || 'Desconocida';
    });

    this.fetchTempData();  // Llama a la función para cargar datos de Firebase
  }

  private fetchTempData() {
    const db = getDatabase(firebaseESPApp);
    const tempRef = ref(db, 'tiempo_real');  // Ruta correcta hacia los datos de tiempo real

    // Escucha los cambios en la base de datos
    onValue(tempRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();  // Obtener todos los datos bajo 'tiempo_real'
        console.log('Datos de Firebase:', data);  // Verifica los datos

        this.tempData = data.temperature;
        this.updateCharts();
        
        // Notificaciones por temperatura
        if (this.tempData > 35) {
          this.localNotificationService.scheduleNotification('Alerta de Temperatura Alta', `Temperatura actual: ${this.tempData}°C`);
        } else if (this.tempData < 25) {
          this.localNotificationService.scheduleNotification('Alerta de Temperatura Baja', `Temperatura actual: ${this.tempData}°C`);
        }
      } else {
        console.log('No se encontraron datos.');
      }
    });
  }

  private updateCharts() {
    if (!document.getElementById('chart_ahora')) return;  // Verifica si el gráfico existe

    const dataAhora = {
      labels: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'],
      datasets: [{
        label: 'Tiempo real',
        data: [this.tempData],  // Usamos el valor de la temperatura
        fill: false,
        borderColor: 'rgb(25, 242, 100)',
        tension: 0.1
      }]
    };

    // Datos adicionales para los gráficos semanal, mensual y anual
// Promedio diario durante la última semana (°C)
const dataSemanal = {
  labels: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'],
  datasets: [{
    label: 'Temperatura Semanal (°C)',
    data: [34.5, 34.8, 35.0, 35.2, 35.1, 34.9, 34.7],
    fill: false,
    borderColor: 'rgb(75, 192, 192)',
    tension: 0.1
  }]
};

// Promedio semanal durante el último mes (°C)
const dataMensual = {
  labels: ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4'],
  datasets: [{
    label: 'Temperatura Mensual (°C)',
    data: [34.6, 35.0, 35.2, 34.8],
    fill: false,
    borderColor: 'rgb(255, 99, 132)',
    tension: 0.1
  }]
};

// Promedio mensual durante el último año (°C)
const dataAnual = {
  labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
  datasets: [{
    label: 'Temperatura Anual (°C)',
    data: [32.5, 33.0, 33.8, 34.5, 35.0, 35.5, 36.0, 35.8, 35.2, 34.5, 33.5, 32.8],
    fill: false,
    borderColor: 'rgb(54, 162, 235)',
    tension: 0.1
  }]
};


    // Si el gráfico ya ha sido creado, solo actualizamos los datos
    if (this.temp_ahora) {
      this.temp_ahora.data = dataAhora;
      this.temp_ahora.update();  // Actualiza el gráfico con los nuevos datos
    } else {
      // Si el gráfico aún no ha sido creado, lo inicializamos
      this.temp_ahora = new Chart("chart_ahora", { type: 'line', data: dataAhora });
    }

    if (this.temp_semanal) {
      this.temp_semanal.data = dataSemanal;
      this.temp_semanal.update();  // Actualiza el gráfico semanal
    } else {
      this.temp_semanal = new Chart("chart_semanal", { type: 'line', data: dataSemanal });
    }

    if (this.temp_mensual) {
      this.temp_mensual.data = dataMensual;
      this.temp_mensual.update();  // Actualiza el gráfico mensual
    } else {
      this.temp_mensual = new Chart("chart_mensual", { type: 'line', data: dataMensual });
    }

    if (this.temp_anual) {
      this.temp_anual.data = dataAnual;
      this.temp_anual.update();  // Actualiza el gráfico anual
    } else {
      this.temp_anual = new Chart("chart_anual", { type: 'line', data: dataAnual });
    }

  }

  goToBoxInfo(): void {
    this.router.navigate(['/box-info', this.cajaNombre]);
  }
}
