import { Injectable } from '@angular/core';

/**
 * @description
 * Servicio que registra: 
 * 1-nuevos usuarios
 * 2-nuevos perfiles
 * 3-inicio sesion
 * 4-recuperar contraseña
 */
/**
 * @usageNotes
 * 
 * se crean la interfaz RegistroUsuario que almacenará todos los usuarios.
 * se crea la interfaz RegistroPerfil el cul almacenará los perfiles creados
 * se crean los métodos:
 * 1-registrarUsuario
 * 2-registrarPerfil
 * 3-iniciarSesion
 * 4-recuperaPass
 */

interface RegistroUsuario {
  email: string;
  password: string;
  username: string;
  birthdate: string;
  perfil: string;
}

// interface RegistroPerfil {
//   perfilCod: number;
//   perfilName: string;
// }

@Injectable({
  providedIn: 'root'
})
export class RegistroService {
  private usuarios: RegistroUsuario[] = [];
  // public perfiles: RegistroPerfil[] = [{ perfilName: 'Admin', perfilCod: 1 },
  // { perfilName: 'Visita', perfilCod: 2 },
  // { perfilName: 'Moderador', perfilCod: 3 }];


  constructor() {
    if (this.isLocalStorageAvailable()) {
      const usuariosGuardados = localStorage.getItem('usuarios');
      this.usuarios = usuariosGuardados ? JSON.parse(usuariosGuardados) : [];
    } else {
      this.usuarios = [];
    }
  }

  /**
   * 
   * @param email -mail del usuario para registrar
   * @param password - password del usuario para registrar
   * @param username -nombre de usuario para registrar
   * @param birthdate - fecha nacimiento del usuario para registrar
   * @param perfil - en general deberia estar bloqueado este campo, pero con el fin de reralizar prueba se habilitó
   * @returns -retornará true si todo va bien
   */
  registrarUsuario(email: string, password: string, username: string, birthdate: string, perfil: string): boolean {
    console.log('Intentando registrar usuario:', { email, username, birthdate, perfil });
    const usuarioExistente = this.usuarios.find(user => user.username === username);
    if (usuarioExistente) {
      this.mostrarAlerta('El usuario ya existe.', 'danger');
      console.log('El usuario ya existe.');
      return false;
    }

    const nuevoUsuario: RegistroUsuario = { email, password, username, birthdate, perfil };
    this.usuarios.push(nuevoUsuario);
    if (this.isLocalStorageAvailable()) {
      localStorage.setItem('usuarios', JSON.stringify(this.usuarios));
    }
    this.mostrarAlerta('RegistroUsuario registrado exitosamente.', 'success');
    console.log('RegistroUsuario registrado exitosamente:', nuevoUsuario);
    return true;
  }

  /**
   * 
   * @param perfilName -nombre del perfil que se grabara
   * @returns retorna true si graba con exito de lo contrario un false
   */
  // registrarPerfil(perfilName: string): boolean {
  //   console.log('Intentando registrar perfil:', { perfilName });
  //   const perfilExistente = this.perfiles.find(per => per. === perfilName);
  //   if (perfilExistente) {
  //     this.mostrarAlerta('El perfil ya existe.', 'danger');
  //     console.log('El perfil ya existe.');
  //     return false;
  //   }

  //   let perfilCod = this.perfiles.length +1;

  //   const nuevoPerfil: RegistroPerfil = { perfilCod, perfilName };
  //   this.perfiles.push(nuevoPerfil);
  //   if (this.isLocalStorageAvailable()) {
  //     localStorage.setItem('perfiles', JSON.stringify(this.perfiles));
  //   }
  //   this.mostrarAlerta('RegistroPerfil registrado exitosamente.', 'success');
  //   console.log('RegistroPerfil registrado exitosamente:', nuevoPerfil);
  //   return true;
  // }



  /**
   * 
   * @param username -nombre de usuario
   * @param password -password del usuario
   * @returns -si valida correctamente el usuario, retornará el perfil del usuario de lo contrario arroja vacío 
   */
  iniciarSesion(username: string, password: string): string {
    console.log('Intentando iniciar sesión:', { username, password });
    const usuario = this.usuarios.find(user => (user.username === username) && user.password === password);
    if (usuario) {
      console.log('Inicio de sesión exitoso:', usuario);
      return usuario.perfil;
    } else {
      this.mostrarAlerta('Usuario o contraseña incorrectos.', 'danger');
      console.log('Usuario o contraseña incorrectos.');
      return '';
    }
  }

  /**
   * 
   * @param mail -mail que se ocupara para recupera password
   * @returns retorna password
   */
  recuperaPass(mail: string): string {
    console.log('Intentando recuperar pass:', { mail });
    const usuario = this.usuarios.find(user => (user.email === mail));
    let pass = "";
    if (usuario != null) {
      console.log('Recuperamos el pass exitosamente:', usuario);
      pass = usuario.password;
    }
    else {
      console.log('No fue posible encontrar la password para el mail ingresado.');
    }

    return pass;
  }

  /**
   * 
   * @param mensaje 
   * @param tipo 
   */
  private mostrarAlerta(mensaje: string, tipo: string): void {
    const alertaDiv = document.createElement('div');
    alertaDiv.className = `alert alert-${tipo}`;
    alertaDiv.appendChild(document.createTextNode(mensaje));
    const container = document.querySelector('.container');
    if (container) {
      const firstChild = container.firstChild;
      if (firstChild) {
        container.insertBefore(alertaDiv, firstChild);
      } else {
        container.appendChild(alertaDiv);
      }

      setTimeout(() => {
        const alerta = document.querySelector('.alert');
        if (alerta) {
          alerta.remove();
        }
      }, 6000);
    }
  }

  private isLocalStorageAvailable(): boolean {
    try {
      const test = '__test__';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch (e) {
      return false;
    }
  }
}