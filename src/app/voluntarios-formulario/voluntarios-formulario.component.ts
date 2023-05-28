import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VoluntariosService } from '../services/voluntarios.service'


@Component({
  selector: 'app-voluntarios-formulario',
  templateUrl: './voluntarios-formulario.component.html',
  styleUrls: ['./voluntarios-formulario.component.css']
})
export class VoluntariosFormularioComponent implements OnInit {
  voluntarioForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private voluntariosService: VoluntariosService
  ) {
    this.voluntarioForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      descripcion: [''],
      habilidades: [''],
      actividadVoluntariadoId: ['']
    });
  }

  ngOnInit(): void {}

  guardarVoluntario(): void {
    if (this.voluntarioForm.valid) {
      this.voluntariosService.guardarVoluntario(this.voluntarioForm.value)
        .subscribe(() => {
          this.voluntarioForm.reset();
        });
    }
  }
}
