import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Actividad } from '../actividad.model';
import { ActividadService } from '../actividad.service';

@Component({
  selector: 'app-actividad-crear',
  templateUrl: './actividad-crear.component.html',
  styleUrls: ['./actividad-crear.component.css']
})
export class ActividadCrearComponent {
  actividad: Actividad = {
    titulo: '',
    descripcion: '',
    ubicacion: '',
    fechaHora: '',
    voluntariosRequeridos: 0,
    organizacionId: 0
  };

  constructor(
    private actividadService: ActividadService,
    private router: Router
  ) {}

  guardarActividad() {
    this.actividadService.crearActividad(this.actividad).subscribe(
      () => {
        this.router.navigate(['/']);
      },
      error => {
        console.log('Error al crear la actividad:', error);
      }
    );
  }

  cancelar() {
    this.router.navigate(['/']);
  }
}
