import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerfilService } from '../../services/perfil.service';
import { FormGroup, FormControl, Validators, AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NavigationEnd, Router } from '@angular/router';


/**
 * @description
 * Componente que registra nuevos perfiles
 */
/**
 * @usageNotes
 * 
 * se valida el campo nombrePerfil para que cumpla con lo siguiente:
 * que permita solo letras
 * que no permita otros caracteres
 * 
 * una vez que los campos del formulario esten validados
 * el metodo Registrar toma el campo 'nombrePerfil' y lo graba
 */

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [HttpClientModule, CommonModule, ReactiveFormsModule],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.scss',
    providers: [PerfilService]
})
export class PerfilComponent {
  formularioPerfil!: FormGroup;
  resultado: boolean = false;

  constructor(
    private router: Router,
    private jsonPerfiles: PerfilService
  ) { 
    this.router.events.subscribe((evt) => {
          if (evt instanceof NavigationEnd) {
            if (evt.url.includes('login')) {
              // override the route reuse strategy
              this.router.routeReuseStrategy.shouldReuseRoute = function () {
                return false;
              };
            }
            // trick the Router into believing it's last link wasn't previously loaded
            this.router.navigated = false;
            // if you need to scroll back to top, here is the right place
            window.scrollTo(0, 0);
          }
        });
        // <================= Recargar al click en navegacion
  }

  ngOnDestroy(): void {
    // Estrategia original================>
    // Con esta linea devolvemos la estrategia
    // original para el comportamieto de los
    // otros componentes en sus rutas.
    this.router.routeReuseStrategy.shouldReuseRoute = (
      future: any,
      curr: any
    ) => {
      return future.routeConfig === curr.routeConfig;
    };
    // <================= Estrategia origina
  }

  Perfiles: any[] = [];
  perfilName: string = '';

  ngOnInit(): void {
    this.jsonPerfiles.getJsonPerfiles().subscribe(data => {
      this.Perfiles = data;
    });

    this.formularioPerfil = new FormGroup({
      nombrePerfil: new FormControl('', [Validators.required, this.ValidaCampo])
    });
  }

  ValidaCampo(control: AbstractControl): { [key: string]: boolean } | null {
    const name = control.value;
    if (!name) {
      return null;
    }

    const SoloLetras = /^[a-zA-Z]+$/;
    if (!SoloLetras.test(name)) {
      return { 'SoloLetras': true };
    }

    const LargoMinPattern = /.{5,15}/;
    if (!LargoMinPattern.test(name)) {
      return { 'invalidLength': true };
    }

    return null;
  }

  eliminar(perfil: any): void {
    const index = this.Perfiles.findIndex((elemento: any) => elemento.perfilCod === perfil.perfilCod);
    
    if (index !== -1) {
      this.Perfiles.splice(index, 1);
      this.jsonPerfiles.MetodoPerfil(this.Perfiles);
    } else {
      window.alert('El elemento de la lista no existe');
    }
  }

  modificar(perfil: any): void {
    const index = this.Perfiles.findIndex((elemento: any) => elemento.perfilCod === perfil.perfilCod);
    
    if (index !== -1) {
      this.Perfiles[index].perfilName = this.perfilName;
      this.jsonPerfiles.MetodoPerfil(this.Perfiles);
    } else {
      window.alert('El elemento de la lista no existe');
    }
  }

  registrar(): void {
    const newPerfil = {
      perfilCod: this.Perfiles.length > 0 ? Math.max(...this.Perfiles.map((p: any) => p.perfilCod)) + 1 : 1,
      perfilName: this.perfilName
    };
    this.Perfiles.push(newPerfil);
    this.jsonPerfiles.MetodoPerfil(this.Perfiles);
  }

  submitForm(): void {
    if (this.perfilName !== null) {
      this.registrar();
      this.perfilName = '';
    } else {
      window.alert('Por favor, ingrese un nombre y una edad válidos');
    }
  }
}
