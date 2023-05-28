import { Component, OnInit } from '@angular/core';
import { DonacionesService } from '../service/donacion.service';
import { Donacion } from '../donacion.model';

@Component({
  selector: 'app-donaciones-lista',
  templateUrl: './donaciones-lista.component.html',
  styleUrls: ['./donaciones-lista.component.css']

})
export class DonacionesListaComponent implements OnInit {
  public donaciones: Donacion[] = [];

  constructor(private donacionesService: DonacionesService) { }

  ngOnInit(): void {
    this.obtenerDonaciones();
  }

  private obtenerDonaciones(): void {
    this.donacionesService.getDonaciones()
      .subscribe(
        (donaciones) => {
          this.donaciones = donaciones;
        },
        (error) => {
          console.error('Error al obtener las donaciones:', error);
        }
      );
  }

  public eliminarDonacion(id: number): void {
    this.donacionesService.eliminarDonacion(id)
      .subscribe(
        () => {
          this.obtenerDonaciones();
        },
        (error) => {
          console.error('Error al eliminar la donación:', error);
        }
      );
  }
}
