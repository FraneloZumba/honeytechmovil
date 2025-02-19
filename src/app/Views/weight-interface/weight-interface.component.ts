import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { Chart } from 'chart.js/auto';
import { getDatabase, ref, onValue } from 'firebase/database';
import { firebaseESPApp } from '../../firebase.config';

@Component({
  selector: 'app-weight-interface',
  templateUrl: './weight-interface.component.html',
  styleUrls: ['./weight-interface.component.css']
})
export class WeightInterfaceComponent implements AfterViewInit {

  public peso_ahora: Chart | null = null;
  public peso_semanal: Chart | null = null;
  public peso_mensual: Chart | null = null;
  public peso_anual: Chart | null = null;
  public pesoData: number = 0;  // Almacenar el valor del peso recibido de Firebase

  constructor(private router: Router) {}

  ngAfterViewInit(): void {
    this.fetchWeightData();  // Llama a la función para cargar datos de Firebase
  }

  private fetchWeightData() {
    const db = getDatabase(firebaseESPApp);
    const weightRef = ref(db, 'tiempo_real');  // Ruta correcta hacia los datos de tiempo real

    // Escucha los cambios en la base de datos
    onValue(weightRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();  // Obtener todos los datos bajo 'tiempo_real'
        console.log('Datos de Firebase:', data);  // Verifica los datos

        this.pesoData = Math.abs(data.weight);  // Convertir el peso a positivo usando Math.abs()
        this.updateCharts();  // Actualiza los gráficos con el nuevo valor de peso
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
        label: 'Peso Real',
        data: [this.pesoData],  // Usamos el valor absoluto del peso
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }]
    };

    // Datos adicionales para los gráficos semanal, mensual y anual
    const dataSemanal = {
      labels: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'],
      datasets: [{
        label: 'Peso Semanal',
        data: [80, 75, 70, 65, 75, 80, 70],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }]
    };

    const dataMensual = {
      labels: ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4'],
      datasets: [{
        label: 'Peso Mensual',
        data: [60, 62, 65, 70],
        fill: false,
        borderColor: 'rgb(255, 99, 132)',
        tension: 0.1
      }]
    };

    const dataAnual = {
      labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
      datasets: [{
        label: 'Peso Anual',
        data: [15, 20, 28, 50, 80, 15, 45, 30, 50, 28, 40, 80],
        fill: false,
        borderColor: 'rgb(54, 162, 235)',
        tension: 0.1
      }]
    };

    // Inicializar gráficos si no existen
    if (this.peso_ahora) {
      this.peso_ahora.data = dataAhora;
      this.peso_ahora.update();  // Actualiza el gráfico de peso real
    } else {
      this.peso_ahora = new Chart("chart_ahora", { type: 'line', data: dataAhora });
    }

    if (this.peso_semanal) {
      this.peso_semanal.data = dataSemanal;
      this.peso_semanal.update();  // Actualiza el gráfico semanal
    } else {
      this.peso_semanal = new Chart("chart_semanal", { type: 'line', data: dataSemanal });
    }

    if (this.peso_mensual) {
      this.peso_mensual.data = dataMensual;
      this.peso_mensual.update();  // Actualiza el gráfico mensual
    } else {
      this.peso_mensual = new Chart("chart_mensual", { type: 'line', data: dataMensual });
    }

    if (this.peso_anual) {
      this.peso_anual.data = dataAnual;
      this.peso_anual.update();  // Actualiza el gráfico anual
    } else {
      this.peso_anual = new Chart("chart_anual", { type: 'line', data: dataAnual });
    }
  }

  goToBoxInfo(): void {
    this.router.navigate(['/box-info', 'cajaNombre']);  // Cambia 'cajaNombre' por la variable que tengas
  }
}
