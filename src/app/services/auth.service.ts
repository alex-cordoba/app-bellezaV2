import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import firebase from "@firebase/app";
import "@firebase/auth";
import { BehaviorSubject } from 'rxjs';
import { cfaSignInPhone } from 'capacitor-firebase-auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  tipoUsuario: boolean;
  public loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public numeroTelefonico: string;
  constructor(
    private angularFireAuth: AngularFireAuth,
    private db: AngularFirestore,
    private zone: NgZone
  ) { }
  init(): void {
    const firebaseConfig = {
      apiKey: "AIzaSyDXl8qbSy9D4KOq8I9lc_p_ckHnJ4Qol74",
      authDomain: "app-belleza.firebaseapp.com",
      projectId: "app-belleza",
      storageBucket: "app-belleza.appspot.com",
      messagingSenderId: "383879460168",
      appId: "1:383879460168:web:9001c92c793631243d6f7d",
      measurementId: "G-JS32SB045X"
    }
    firebase.initializeApp(firebaseConfig);

    // Emit logged in status whenever auth state changes
    firebase.auth().onAuthStateChanged(firebaseUser => {
      this.zone.run(() => {
        firebaseUser ? this.loggedIn.next(true) : this.loggedIn.next(false);
      });
    });
  }

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
  public verificarTel(numero: string) {
    console.log(`+57${numero}`);
    if (numero) {
      cfaSignInPhone(`+57${numero}`).subscribe((user) => {
        console.log(user);
      }), (err) => {
        console.log(err);
      }
    }
  }
}
