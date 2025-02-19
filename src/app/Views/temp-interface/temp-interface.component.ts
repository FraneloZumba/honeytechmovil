import { Component, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Chart } from 'chart.js/auto';
import { getDatabase, ref, onValue } from 'firebase/database';
import { firebaseESPApp } from '../../firebase.config';

@Component({
  selector: 'app-temp-interface',
  templateUrl: './temp-interface.component.html',
  styleUrls: ['./temp-interface.component.css']
})
export class TempInterfaceComponent implements AfterViewInit {
  public temp_ahora: Chart | null = null;
  public tempData: number = 0;  // Almacenamos la temperatura recibida de Firebase
  public cajaNombre: string = 'Desconocida';

  constructor(private route: ActivatedRoute, private router: Router) {}

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

        this.tempData = data.temperature;  // Actualiza la temperatura con el valor recibido
        this.updateCharts();  // Actualiza los gráficos con el nuevo valor de temperatura
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

    // Si el gráfico ya ha sido creado, solo actualizamos los datos
    if (this.temp_ahora) {
      this.temp_ahora.data = dataAhora;
      this.temp_ahora.update();  // Actualiza el gráfico con los nuevos datos
    } else {
      // Si el gráfico aún no ha sido creado, lo inicializamos
      this.temp_ahora = new Chart("chart_ahora", { type: 'line', data: dataAhora });
    }
  }

  goToBoxInfo(): void {
    this.router.navigate(['/box-info', this.cajaNombre]);
  }
}
