import { Component, OnInit } from '@angular/core';
import { Donacion } from './donacion.model';
import { DonacionesService } from './donaciones.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-donaciones',
  templateUrl: './donaciones.component.html',
  styleUrls: ['./donaciones.component.css']
})
export class DonacionesComponent implements OnInit {
  donaciones: any[] = [];
  donacionSeleccionada: any | undefined;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getDonaciones();
  }

  getDonaciones() {
    this.http.get<any[]>('API/donaciones').subscribe(
      (response) => {
        this.donaciones = response;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  // Método para crear una nueva donación
  createDonacion() {
    this.http.post('API/donaciones', this.donacionSeleccionada).subscribe(
      () => {
        this.clearForm();
        this.getDonaciones();
      },
      (error) => {
        console.error(error);
      }
    );
  }

  // Método para actualizar una donación existente
  updateDonacion() {
    this.http.put(`API/donaciones/${this.donacionSeleccionada.id}`, this.donacionSeleccionada).subscribe(
      () => {
        this.clearForm();
        this.getDonaciones();
      },
      (error) => {
        console.error(error);
      }
    );
  }

  // Método para eliminar una donación
  deleteDonacion(id: number) {
    this.http.delete(`API/donaciones/${id}`).subscribe(
      () => {
        this.getDonaciones();
      },
      (error) => {
        console.error(error);
      }
    );
  }

  // Método para limpiar el formulario y restablecer la donación seleccionada
  clearForm() {
    this.donacionSeleccionada = null;
  }
}
