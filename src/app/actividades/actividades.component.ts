import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

interface Actividad {
  id: number;
  titulo: string;
  descripcion: string;
  ubicacion: string;
  fechaHora: string;
  voluntariosRequeridos: number;
  organizacionId: number;
}

@Component({
  selector: 'app-actividades',
  templateUrl: './actividades.component.html',
  styleUrls: ['./actividades.component.css']
})
export class ActividadesComponent implements OnInit {
  actividades: Actividad[] = [];
  actividadForm: Actividad = {
    id: 0,
    titulo: '',
    descripcion: '',
    ubicacion: '',
    fechaHora: '',
    voluntariosRequeridos: 0,
    organizacionId: 0
  };

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.cargarActividades();
  }

  cargarActividades(): void {
    this.http.get<Actividad[]>('API')
      .subscribe(data => {
        this.actividades = data;
      });
  }

  agregarActividad(actividadForm: NgForm): void {
    this.http.post('API', actividadForm.value)
      .subscribe(() => {
        actividadForm.resetForm();
        this.cargarActividades();
      });
  }

  editarActividad(actividad: Actividad): void {
    this.http.put(`API/${actividad.id}`, actividad)
      .subscribe(() => {
        this.cargarActividades();
      });
  }

  eliminarActividad(id: number): void {
    this.http.delete(`API/${id}`)
      .subscribe(() => {
        this.cargarActividades();
      });
  }
}
