import { ComponentFixture, TestBed } from '@angular/core/testing';

import { informeComponent } from './informe.component';

describe('informeComponent', () => {
  let component: informeComponent;
  let fixture: ComponentFixture<informeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ informeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(informeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
