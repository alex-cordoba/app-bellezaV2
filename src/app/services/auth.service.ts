import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  tipoUsuario: boolean;

  constructor(
    private angularFireAuth: AngularFireAuth,
    private db: AngularFirestore,
  ) { }

  public registrarUsuario(form) {
    console.log(form);
    
    return new Promise((resolve, reject) => {
      this.angularFireAuth.createUserWithEmailAndPassword(form.correo, form.password).then(res => {
        if (res) {
          if (this.tipoUsuario) {
            console.log('entra a registrar usuario');
            
            this.registrarDatosAdicionalesUsuario(form);
          } else {
            console.log('entra a registrar prof');

            this.registrarDatosAdicionalesProfesional(form);
          }
        }
        resolve(res)
      }).catch(err => reject(err))
    })
  }
  private registrarDatosAdicionalesUsuario(form) {
    this.db.collection('usuarios').doc(form.correo).set({
      nombre: form.nombre,
      ciudad: form.ciudad,
      correo: form.correo
    })
  }
  private registrarDatosAdicionalesProfesional(form) {
    this.db.collection('profesionales').doc(form.correo).set({
      nombre: form.nombre,
      ciudad: form.ciudad,
      correo: form.correo,
      fechaNacimiento: form.fechaNacimiento,
      id: form.numeroIdentificacion,
      tipoId: form.idIdentificacion
    })
  }
  login(email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.angularFireAuth.signInWithEmailAndPassword(email, password).then(res => {
        resolve(res)
      }).catch(err => reject(err))
    })
  }
}
