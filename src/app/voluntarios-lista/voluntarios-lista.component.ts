import { Component, OnInit } from '@angular/core';
import { VoluntariosService } from '../services/voluntarios.service';

@Component({
  selector: 'app-voluntarios-lista',
  templateUrl: './voluntarios-lista.component.html',
  styleUrls: ['./voluntarios-lista.component.css']
})
export class VoluntariosListaComponent implements OnInit {
  voluntarios: any[] = [];

  constructor(private voluntariosService: VoluntariosService) {}

  ngOnInit(): void {
    this.obtenerVoluntarios();
  }

  obtenerVoluntarios(): void {
    this.voluntariosService.obtenerVoluntarios()
      .subscribe((data: any[]) => {
        this.voluntarios = data;
      });
  }

  eliminarVoluntario(id: number): void {
    this.voluntariosService.eliminarVoluntario(id)
      .subscribe(() => {
        this.obtenerVoluntarios();
      });
  }
}
