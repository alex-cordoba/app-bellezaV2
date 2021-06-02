import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  formulario: FormGroup;
  passwordVerificado = false;
  ciudades = [
    {id: 0, nombre: 'Popayan'},
    {id: 1, nombre: 'Pasto'},
    {id: 2, nombre: 'Cali'}
  ]

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.crearFormulario();
  }
  private crearFormulario() {
    this.formulario = this.fb.group({
      nombre: [null, [Validators.required]],
      ciudad: [null, [Validators.required]],
      correo: [null, [Validators.required]],
      password: [null, [Validators.required, Validators.minLength(6)]],
      Verifpassword: [null, [Validators.required, Validators.minLength(6)]],
      fechaNacimiento: [null, [Validators.required]],
      checkTerminos: [null, [Validators.required]]
    })
  }
  get password() {return this.formulario.get('password')}
  get nombre() {return this.formulario.get('nombre')}
  get ciudad() {return this.formulario.get('ciudad')}
  get correo() {return this.formulario.get('correo')}
  get fechaNacimiento() {return this.formulario.get('fechaNacimiento')}


  public registrarUsuario() {
    this.authService.tipoUsuario = true;
    console.log(this.passwordVerificado, this.formulario.valid);
    if (this.formulario.get('checkTerminos').value) {
      if (this.passwordVerificado && this.formulario.valid) {
        this.authService.registrarUsuario(this.formulario.value).then(auth => {
          this.router.navigate(['/dashboard']);
        }).catch(err => console.log(err)
        )
      } else if (this.passwordVerificado === false) {
        this.toastr.error('', 'Las contraseñas no coinciden', {
          timeOut: 3000
        })
      }
    } else {
      this.toastr.error('', 'Debes aceptar los terminos y condiciones', {
        timeOut: 3000
      })
    }
  }
  public verificarPassword() {
    if (this.formulario.get('Verifpassword').value && this.formulario.get('password').value) {
      if (this.formulario.get('Verifpassword').value === this.formulario.get('password').value) {
        this.passwordVerificado = true;
      } else {
        this.toastr.error('', 'Las contraseñas no coinciden', {
          timeOut: 3000
        })
      }
    }
  }

}
