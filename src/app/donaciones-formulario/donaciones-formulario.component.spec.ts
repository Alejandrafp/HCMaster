import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonacionesFormularioComponent } from './donaciones-formulario.component';

describe('DonacionesFormularioComponent', () => {
  let component: DonacionesFormularioComponent;
  let fixture: ComponentFixture<DonacionesFormularioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DonacionesFormularioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DonacionesFormularioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
