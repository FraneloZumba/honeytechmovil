import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { Chart } from 'chart.js/auto';
import { getDatabase, ref, onValue } from 'firebase/database';
import { firebaseESPApp } from '../../firebase.config';
import { LocalNotificationService } from '../../services/local-notification.service'; // Asegúrate de importar el servicio

@Component({
  selector: 'app-humidity-interface',
  templateUrl: './humidity-interface.component.html',
  styleUrls: ['./humidity-interface.component.css']
})
export class HumidityInterfaceComponent implements AfterViewInit {

  public humed_ahora: Chart | null = null;
  public humed_semanal: Chart | null = null;
  public humed_mensual: Chart | null = null;
  public humed_anual: Chart | null = null;
  public humedData: number = 0;  // Almacenar el valor de la humedad recibida de Firebase

  constructor(
    private router: Router,
    private localNotificationService: LocalNotificationService // Inyecta el servicio de notificaciones
  ) {}

  ngAfterViewInit(): void {
    this.fetchHumidityData();  // Llama a la función para cargar datos de Firebase
  }

  private fetchHumidityData() {
    const db = getDatabase(firebaseESPApp);
    const humidityRef = ref(db, 'tiempo_real');  // Ruta correcta hacia los datos de tiempo real

    // Escucha los cambios en la base de datos
    onValue(humidityRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();  // Obtener todos los datos bajo 'tiempo_real'
        console.log('Datos de Firebase:', data);  // Verifica los datos

        this.humedData = data.humidity;
        this.updateCharts();
        
        // Notificaciones por humedad
        if (this.humedData < 60) {
          this.localNotificationService.scheduleNotification('Alerta de Humedad Baja', `Humedad actual: ${this.humedData}%`);
        } else if (this.humedData > 95) {
          this.localNotificationService.scheduleNotification('Alerta de Humedad Alta', `Humedad actual: ${this.humedData}%`);
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
        label: 'Humedad Real',
        data: [this.humedData],  // Usamos el valor de la humedad
        fill: false,
        borderColor: 'rgb(255, 159, 64)',
        tension: 0.1
      }]
    };

    // Datos adicionales para los gráficos semanal, mensual y anual
   // Promedio diario de humedad durante la última semana (%)
const dataSemanal = {
  labels: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'],
  datasets: [{
    label: 'Humedad Semanal (%)',
    data: [65, 68, 70, 72, 71, 69, 67],
    fill: false,
    borderColor: 'rgb(75, 192, 192)',
    tension: 0.1
  }]
};

// Promedio semanal de humedad durante el último mes (%)
const dataMensual = {
  labels: ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4'],
  datasets: [{
    label: 'Humedad Mensual (%)',
    data: [66, 70, 73, 68],
    fill: false,
    borderColor: 'rgb(255, 99, 132)',
    tension: 0.1
  }]
};

// Promedio mensual de humedad durante el último año (%)
const dataAnual = {
  labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
  datasets: [{
    label: 'Humedad Anual (%)',
    data: [62, 64, 67, 70, 72, 74, 75, 73, 71, 68, 65, 63],
    fill: false,
    borderColor: 'rgb(54, 162, 235)',
    tension: 0.1
  }]
};


    // Inicializar gráficos si no existen
    if (this.humed_ahora) {
      this.humed_ahora.data = dataAhora;
      this.humed_ahora.update();  // Actualiza el gráfico de tiempo real
    } else {
      this.humed_ahora = new Chart("chart_ahora", { type: 'line', data: dataAhora });
    }

    if (this.humed_semanal) {
      this.humed_semanal.data = dataSemanal;
      this.humed_semanal.update();  // Actualiza el gráfico semanal
    } else {
      this.humed_semanal = new Chart("chart_semanal", { type: 'line', data: dataSemanal });
    }

    if (this.humed_mensual) {
      this.humed_mensual.data = dataMensual;
      this.humed_mensual.update();  // Actualiza el gráfico mensual
    } else {
      this.humed_mensual = new Chart("chart_mensual", { type: 'line', data: dataMensual });
    }

    if (this.humed_anual) {
      this.humed_anual.data = dataAnual;
      this.humed_anual.update();  // Actualiza el gráfico anual
    } else {
      this.humed_anual = new Chart("chart_anual", { type: 'line', data: dataAnual });
    }
  }

  goToBoxInfo(): void {
    this.router.navigate(['/box-info', 'cajaNombre']);  // Cambia 'cajaNombre' por la variable que tengas
  }
}
