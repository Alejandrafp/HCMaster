import { Component } from '@angular/core';
import { DonacionesService } from '../service/donacion.service';
import { Donacion } from '../donacion.model';

@Component({
  selector: 'app-donaciones-formulario',
  templateUrl: './donaciones-formulario.component.html',
  styleUrls: ['./donaciones-formulario.component.css']
})
export class DonacionesFormularioComponent {
  public donacion: Donacion = {
    nombreDonante: '',
    cantidadDonada: 0,
    fecha: new Date(),
    proyectoId: 0
  };

  constructor(private donacionesService: DonacionesService) { }

  public crearDonacion(): void {
    this.donacionesService.crearDonacion(this.donacion)
      .subscribe(
        () => {
          // Donación creada exitosamente
        },
        (error) => {
          console.error('Error al crear la donación:', error);
        }
      );
  }
}
