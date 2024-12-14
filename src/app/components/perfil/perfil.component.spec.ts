import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilComponent } from './perfil.component';

describe('PerfilComponent', () => {
  let component: PerfilComponent;
  let fixture: ComponentFixture<PerfilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PerfilComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PerfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('prueba 1: Perfil registrado con error', () => {
    component.formularioPerfil.setValue({
      nombrePerfil: "Prueba1"
    });
    component.registrar();
    expect(component.resultado).toBe(false);
  });

  it('prueba 2: Perfil registrado sin error', () => {
    component.formularioPerfil.setValue({
      nombrePerfil: "PruebaDos"
    });
    component.registrar();
    expect(component.resultado).toBe(true);
  });

});
