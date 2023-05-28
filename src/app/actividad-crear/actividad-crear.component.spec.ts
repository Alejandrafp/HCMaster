import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActividadCrearComponent } from './actividad-crear.component';

describe('ActividadCrearComponent', () => {
  let component: ActividadCrearComponent;
  let fixture: ComponentFixture<ActividadCrearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActividadCrearComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActividadCrearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
