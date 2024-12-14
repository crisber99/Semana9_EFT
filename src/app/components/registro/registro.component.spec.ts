import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroComponent } from './registro.component';

describe('RegistroComponent', () => {
  let component: RegistroComponent;
  let fixture: ComponentFixture<RegistroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistroComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('prueba 1: usuario registrado con error', () => {
    component.formularioRegistro.setValue({
      mail: "mail9@mail.com",
      pass: "123456",
      userName: "user9",
      fechaNacimiento: "25/03/1986",
      perfil: 'Visita'
    });
    component.registrar();
    expect(component.resultado).toBe(false);
  });

  it('prueba 2: usuario registrado exitoso', () => {
    component.formularioRegistro.setValue({
      mail: "mail10@mail.com",
      pass: "Panta11a$",
      userName: "userDiez",
      fechaNacimiento: "25/03/1986",
      perfil: 'Visita'
    });
    component.registrar();
    expect(component.resultado).toBe(true);
  });
});
