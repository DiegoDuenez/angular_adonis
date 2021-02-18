import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-form-inicio-sesion',
  templateUrl: './form-inicio-sesion.component.html',
  styleUrls: ['./form-inicio-sesion.component.css'],
})
export class FormInicioSesionComponent implements OnInit {
  loginForm!: FormGroup;
  user!: User;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.createForm();
  }

  ngOnInit(): void {}

  login(): void {
    if (this.loginForm.invalid) {
      return Object.values(this.loginForm.controls).forEach((control) => {
        control.markAsTouched();
      });
    } else {
      this.setUser();
      console.log(this.user);
      this.authService.login(this.user).subscribe(
        (data: any) => {
          this.router.navigate(['/perfil']);
          console.log('Inicio de sesion completado');
          const token = data.token.token;
          console.log('token', token);
          localStorage.setItem('token', token);
          this.router.navigate(['/perfil']);
        },
        (error) => {
          console.log('Usuario o contraseña incorrecta');
        }
      );
    }
  }

  get emailValidate() {
    return (
      this.loginForm.get('email')?.invalid &&
      this.loginForm.get('email')?.touched
    );
  }

  get passwordValidate() {
    return (
      this.loginForm.get('password')?.invalid &&
      this.loginForm.get('password')?.touched
    );
  }

  createForm(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  setUser(): void {
    this.user = {
      id: this.loginForm.get('id')?.value,
      nombre: this.loginForm.get('nombre')?.value,
      apellidos: this.loginForm.get('apellidos')?.value,
      edad: this.loginForm.get('edad')?.value,
      email: this.loginForm.get('email')?.value,
      password: this.loginForm.get('password')?.value,
    };
  }
}
