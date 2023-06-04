import { Component, OnInit } from '@angular/core';
import { Voluntario } from './voluntario.model';
import { VoluntariosService } from '../voluntarios.service';

@Component({
  selector: 'app-voluntarios',
  templateUrl: './voluntarios.component.html',
  styleUrls: ['./voluntarios.component.css']
})
export class VoluntariosComponent implements OnInit {
  voluntarios: any[]=[];
  nuevoVoluntario: Voluntario = {
    id: 0,
    nombre: '',
    apellido: '',
    correoElectronico: '',
    descripcion: '',
    habilidades: '',
    actividadVoluntariadoId: 0
  };

  constructor(private voluntariosService: VoluntariosService) { }

  ngOnInit(): void {
    this.obtenerVoluntarios();
  }

  obtenerVoluntarios(): void {
    this.voluntariosService.obtenerVoluntarios().subscribe(voluntarios => {
      this.voluntarios = voluntarios;
    });
  }

  guardarVoluntario(): void {
    if (this.nuevoVoluntario.id === 0) {
      this.voluntariosService.crearVoluntario(this.nuevoVoluntario).subscribe(() => {
        this.obtenerVoluntarios();
        this.resetForm();
      });
    } else {
      this.voluntariosService.actualizarVoluntario(this.nuevoVoluntario.id, this.nuevoVoluntario).subscribe(() => {
        this.obtenerVoluntarios();
        this.resetForm();
      });
    }
  }

  editarVoluntario(id: number): void {
    const voluntario = this.voluntarios.find(v => v.id === id);
    if (voluntario) {
      this.nuevoVoluntario = { ...voluntario };
    }
  }

  eliminarVoluntario(id: number): void {
    if (confirm('¿Estás seguro de eliminar este voluntario?')) {
      this.voluntariosService.eliminarVoluntario(id).subscribe(() => {
        this.obtenerVoluntarios();
      });
    }
  }

  resetForm(): void {
    this.nuevoVoluntario = {
      id: 0,
      nombre: '',
      apellido: '',
      correoElectronico: '',
      descripcion: '',
      habilidades: '',
      actividadVoluntariadoId: 0
    };
  }
}
