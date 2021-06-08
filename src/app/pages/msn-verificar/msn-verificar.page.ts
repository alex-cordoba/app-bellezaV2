import { Component, OnInit } from '@angular/core';
import { cfaSignInPhoneOnCodeSent } from 'capacitor-firebase-auth';
import { cfaSignInPhone } from 'capacitor-firebase-auth';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-msn-verificar',
  templateUrl: './msn-verificar.page.html',
  styleUrls: ['./msn-verificar.page.scss'],
})
export class MsnVerificarPage implements OnInit {
  msn: string;
  constructor(
    private authService: AuthService,
  ) { }

  ngOnInit() {
  }
  public verificarMsn() {
    cfaSignInPhone(this.authService.numeroTelefonico, this.msn).subscribe((res) => {
      console.log(res);
    })
  }

}
