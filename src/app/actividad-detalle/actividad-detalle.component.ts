import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Actividad } from '../actividad.model';
import { ActividadService } from '../actividad.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-actividad-detalle',
  templateUrl: './actividad-detalle.component.html',
  styleUrls: ['./actividad-detalle.component.css']
})
export class ActividadDetalleComponent implements OnInit {
  actividad: Actividad;

  constructor(
    private route: ActivatedRoute,
    private actividadService: ActividadService,
    private router: Router
  ) {}

  ngOnInit() {
    const id =+this.route.snapshot.paramMap.get('id');
    this.obtenerActividad(id);
  }

  obtenerActividad(id: number) {
    this.actividadService.obtenerActividad(id).subscribe(
      actividad => {
        this.actividad = actividad;
      },
      error => {
        console.log('Error al obtener la actividad:', error);
      }
    );
  }

  eliminarActividad(id: number) {
    this.actividadService.eliminarActividad(id).subscribe(
      () => {
        console.log('Actividad eliminada correctamente');
        this.router.navigate(['/actividades']);
      },
      error => {
        console.log('Error al eliminar la actividad:', error);
      }
    );
  }
}
