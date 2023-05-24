import { ComponentFixture, TestBed } from '@angular/core/testing';

import { clientesDetailComponent } from './clientes-detail.component';

describe('clientesDetailComponent', () => {
  let component: clientesDetailComponent;
  let fixture: ComponentFixture<clientesDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ clientesDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(clientesDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
