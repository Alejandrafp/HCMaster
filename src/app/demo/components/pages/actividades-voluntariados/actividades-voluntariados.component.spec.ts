import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActividadesVoluntariadosComponent } from './actividades-voluntariados.component';

describe('ActividadesVoluntariadosComponent', () => {
  let component: ActividadesVoluntariadosComponent;
  let fixture: ComponentFixture<ActividadesVoluntariadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActividadesVoluntariadosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActividadesVoluntariadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
