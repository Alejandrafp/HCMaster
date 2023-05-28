import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActividadEditarComponent } from './actividad-editar.component';

describe('ActividadEditarComponent', () => {
  let component: ActividadEditarComponent;
  let fixture: ComponentFixture<ActividadEditarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActividadEditarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActividadEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
