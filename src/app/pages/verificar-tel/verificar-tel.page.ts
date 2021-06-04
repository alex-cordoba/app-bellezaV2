import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { cfaSignInPhone } from 'capacitor-firebase-auth';


@Component({
  selector: 'app-verificar-tel',
  templateUrl: './verificar-tel.page.html',
  styleUrls: ['./verificar-tel.page.scss'],
})
export class VerificarTelPage implements OnInit {
  public telefono: number;
  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {

  }
  public verificarTel() {
    this.authService.verificarTel();
  }

}
