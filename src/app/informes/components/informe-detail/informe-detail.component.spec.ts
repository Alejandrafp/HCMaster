import { ComponentFixture, TestBed } from '@angular/core/testing';

import { informeDetailComponent } from './informe-detail.component';

describe('informeDetailComponent', () => {
  let component: informeDetailComponent;
  let fixture: ComponentFixture<informeDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ informeDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(informeDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
