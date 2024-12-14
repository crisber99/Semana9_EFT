import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuarioService } from '../../services/usuario.service';
import { FormGroup, FormControl, Validators, AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


/**
 * @description
 * Componente que registra nuevos Usuarios
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
  selector: 'app-usuario',
  standalone: true,
  imports: [HttpClientModule, CommonModule, ReactiveFormsModule],
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.scss',
  providers: [UsuarioService]
})
export class UsuarioComponent {
  formularioUsuario!: FormGroup;
  resultado: boolean = false;

  constructor(
    private jsonUsuario: UsuarioService
  ) { }

  Usuarios: any[] = [];
  perfilName: string = '';

  ngOnInit(): void {
    this.jsonUsuario.getJsonDataUsuario().subscribe(data => {
      this.Usuarios = data;
    });

    this.formularioUsuario = new FormGroup({
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
    const index = this.Usuarios.findIndex((elemento: any) => elemento.username === perfil.username);
    
    if (index !== -1) {
      this.Usuarios.splice(index, 1);
      this.jsonUsuario.MetodoUsuario(this.Usuarios);
    } else {
      window.alert('El elemento de la lista no existe');
    }
  }

  modificar(perfil: any): void {
    const index = this.Usuarios.findIndex((elemento: any) => elemento.username === perfil.username);
    
    if (index !== -1) {
      this.Usuarios[index].perfilName = this.perfilName;
      this.jsonUsuario.MetodoUsuario(this.Usuarios);
    } else {
      window.alert('El elemento de la lista no existe');
    }
  }

  // registrar(): void {
  //   const newPerfil = {
  //     perfilCod: this.Usuarios.length > 0 ? Math.max(...this.Usuarios.map((p: any) => p.perfilCod)) + 1 : 1,
  //     perfilName: this.perfilName
  //   };
  //   this.Usuarios.push(newPerfil);
  //   this.jsonUsuario.MetodoUsuario(this.Usuarios);
  // }

  // submitForm(): void {
  //   if (this.perfilName !== null) {
  //     this.registrar();
  //     this.perfilName = '';
  //   } else {
  //     window.alert('Por favor, ingrese un nombre y una edad válidos');
  //   }
  // }
}
