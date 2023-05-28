import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoluntariosListaComponent } from './voluntarios-lista.component';

describe('VoluntariosListaComponent', () => {
  let component: VoluntariosListaComponent;
  let fixture: ComponentFixture<VoluntariosListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VoluntariosListaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VoluntariosListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
