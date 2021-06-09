import { Component, OnInit } from '@angular/core';
import { cfaSignInPhone, cfaSignInPhoneOnCodeReceived } from 'capacitor-firebase-auth';
import { AuthService } from 'src/app/services/auth.service';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-msn-verificar',
  templateUrl: './msn-verificar.page.html',
  styleUrls: ['./msn-verificar.page.scss'],
})
export class MsnVerificarPage implements OnInit {
  msn: string;
  verificationId: string;
  constructor(
    private authService: AuthService,
    private route: Router,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.escucharCodigoMsn();
    this.estaLogueado();
  }
  async escucharCodigoMsn() {
    await cfaSignInPhoneOnCodeReceived()
      .subscribe((event: {verificationId: string, verificationCode: string}) => {
        console.log(`${event.verificationId}:${event.verificationCode}`);
        this.msn = event.verificationCode;
        this.verificationId = event.verificationId;
        if (this.msn) {
          this.spinner.show();
          setTimeout(() => {
            this.spinner.hide();
            this.route.navigate(['/registro'])
          }, 1500);
        }
      })
  }
  async estaLogueado() {
    await this.authService.loggedIn.subscribe((res) => {
      console.log(res);
      if (res) {
        this.route.navigate(['/registro'])
      }
    })
  }
  public verificarMsn() {
    console.log(this.msn);
    // if (this.verificationId && this.msn) {
    //   const credencial = firebase.default.auth.PhoneAuthProvider.credential(this.verificationId, this.msn);
    //     firebase.default.auth().signInWithCredential(credencial).then(res => {
    //       console.log('logueado', res);
    //     }).catch(err => {
    //       console.log('error', err);
    //     });
    // }
    if (this.verificationId && this.msn) {
      cfaSignInPhone(this.authService.numeroTelefonico, this.msn).subscribe((res) => {
        console.log(res);
      })
    }
  }

}
