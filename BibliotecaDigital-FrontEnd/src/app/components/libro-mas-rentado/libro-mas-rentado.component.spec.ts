import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibroMasRentadoComponent } from './libro-mas-rentado.component';

describe('LibroMasRentadoComponent', () => {
  let component: LibroMasRentadoComponent;
  let fixture: ComponentFixture<LibroMasRentadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LibroMasRentadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LibroMasRentadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
