import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioMasRentaComponent } from './usuario-mas-renta.component';

describe('UsuarioMasRentaComponent', () => {
  let component: UsuarioMasRentaComponent;
  let fixture: ComponentFixture<UsuarioMasRentaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsuarioMasRentaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuarioMasRentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
