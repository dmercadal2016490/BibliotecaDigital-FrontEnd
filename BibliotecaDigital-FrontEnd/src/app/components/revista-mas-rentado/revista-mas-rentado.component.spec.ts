import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevistaMasRentadoComponent } from './revista-mas-rentado.component';

describe('RevistaMasRentadoComponent', () => {
  let component: RevistaMasRentadoComponent;
  let fixture: ComponentFixture<RevistaMasRentadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RevistaMasRentadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RevistaMasRentadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
