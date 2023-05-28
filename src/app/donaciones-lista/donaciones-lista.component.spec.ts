import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonacionesListaComponent } from './donaciones-lista.component';

describe('DonacionesListaComponent', () => {
  let component: DonacionesListaComponent;
  let fixture: ComponentFixture<DonacionesListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DonacionesListaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DonacionesListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
