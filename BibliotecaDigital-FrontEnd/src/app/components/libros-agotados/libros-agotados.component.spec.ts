import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibrosAgotadosComponent } from './libros-agotados.component';

describe('LibrosAgotadosComponent', () => {
  let component: LibrosAgotadosComponent;
  let fixture: ComponentFixture<LibrosAgotadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LibrosAgotadosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LibrosAgotadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
