import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoluntariosFormularioComponent } from './voluntarios-formulario.component';

describe('VoluntariosFormularioComponent', () => {
  let component: VoluntariosFormularioComponent;
  let fixture: ComponentFixture<VoluntariosFormularioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VoluntariosFormularioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VoluntariosFormularioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
