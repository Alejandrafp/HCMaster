import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Actividad } from './actividad.model';
import { ActividadService } from './actividad.service';

@Component({
  selector: 'app-actividad-lista',
  templateUrl: './actividad-lista.component.html',
  styleUrls: ['./actividad-lista.component.css']
})
export class ActividadListaComponent implements OnInit {
  actividades: Actividad[];

  constructor(
    private actividadService: ActividadService,
    private router: Router
  ) {}

  ngOnInit() {
    this.obtenerActividades();
  }

  obtenerActividades() {
    this.actividadService.obtenerActividades().subscribe(
      actividades => {
        this.actividades = actividades;
      },
      error => {
        console.log('Error al obtener las actividades:', error);
      }
    );
  }

  verDetalle(id: number) {
    this.router.navigate(['/detalle', id]);
  }

  editarActividad(id: number) {
    this.router.navigate(['/editar', id]);
  }

  eliminarActividad(id: number) {
    this.actividadService.eliminarActividad(id).subscribe(
      () => {
        this.obtenerActividades();
      },
      error => {
        console.log('Error al eliminar la actividad:', error);
      }
    );
  }

  crearActividad() {
    this.router.navigate(['/crear']);
  }
}
