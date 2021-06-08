import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verificar-tel',
  templateUrl: './verificar-tel.page.html',
  styleUrls: ['./verificar-tel.page.scss'],
})
export class VerificarTelPage implements OnInit {
  public telefono: string;
  public minTelefono: boolean;
  private entraVerificar: boolean;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit() {

  }
  public verificarTel() {
    this.entraVerificar = true;
    if (this.telefono.toString().length === 10) {
      this.authService.verificarTel(this.telefono.toString());
      this.authService.numeroTelefonico = this.telefono;
      this.router.navigate(['/msn-verificar']);
    } else {
      this.minTelefono = true;
    }
  }
  public verificarLongitud() {
    this.entraVerificar = false;
    this.telefono.toString().length < 10 && this.entraVerificar ? this.minTelefono = true: this.minTelefono = false;
  }

}
