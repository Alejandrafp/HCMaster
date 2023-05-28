import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Actividad } from '../actividad.model';
import { ActividadService } from '../actividad.service';

@Component({
  selector: 'app-actividad-editar',
  templateUrl: './actividad-editar.component.html',
  styleUrls: ['./actividad-editar.component.css']
})
export class ActividadEditarComponent implements OnInit {
  actividad: Actividad;

  constructor(
    private route: ActivatedRoute,
    private actividadService: ActividadService,
    private router: Router
  ) {}

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');
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

  guardarActividad() {
    this.actividadService.actualizarActividad(this.actividad).subscribe(
      () => {
        this.router.navigate(['/']);
      },
      error => {
        console.log('Error al actualizar la actividad:', error);
      }
    );
  }

  cancelar() {
    this.router.navigate(['/']);
  }
}
