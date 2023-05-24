import { ComponentFixture, TestBed } from '@angular/core/testing';

import { clienteDetailComponent } from './cliente-detail.component';

describe('clienteDetailComponent', () => {
  let component: clienteDetailComponent;
  let fixture: ComponentFixture<clienteDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ clienteDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(clienteDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
