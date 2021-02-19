import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-usuario-perfil',
  templateUrl: './usuario-perfil.component.html',
  styleUrls: ['./usuario-perfil.component.css'],
})
export class UsuarioPerfilComponent implements OnInit {
  user!: User;
  id!: Number;
  nombre!: String;
  apellidos!: String;
  edad!: Number;
  email!: String;
  updateActive: boolean = false;
  mostrar!:Boolean;

  registroForm!: FormGroup;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
    
  ) { this.crearForm(); }

  ngOnInit(): void {
    this.authService.perfil(this.user).subscribe(
      (data: any) => {
        this.router.navigate(['/perfil']);
        this.id = data['id'];
        this.nombre = data['nombre'];
        this.apellidos = data['apellidos'];
        this.edad = data['edad'];
        this.email = data['email'];
      },
      (error) => {
        console.log(error);
      }
    );
  }

  dataShow(){

    if(this.mostrar == true){
      this.mostrar = false;
      
    }else{
      this.mostrar = true;
    }
    
  }

  registro(): void {
    
    if (this.registroForm.invalid) {
      return Object.values(this.registroForm.controls).forEach((control) => {
        control.markAsTouched();
      });
    } else {
      this.setUser();
      this.authService.actualizarUsuario(this.user, this.id).subscribe(
        (data: any) => {
          this.router.navigate(['/perfil']);
          this.mostrar = false
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  crearForm(): void {
    this.registroForm = this.fb.group({
      nombre: ['', [Validators.required]],
      apellidos: ['', [Validators.required]],
      edad: ['', [Validators.required]],
      email: ['', [Validators.required]]   
    });
  }

  get nombreValidate() {
    return (
      this.registroForm.get('nombre')?.invalid &&
      this.registroForm.get('nombre')?.touched
    );
  }

  get apellidosValidate() {
    return (
      this.registroForm.get('apellidos')?.invalid &&
      this.registroForm.get('apellidos')?.touched
    );
  }

  get edadValidate() {
    return (
      this.registroForm.get('edad')?.invalid &&
      this.registroForm.get('edad')?.touched
    );
  }

  get emailValidate() {
    return (
      this.registroForm.get('email')?.invalid &&
      this.registroForm.get('email')?.touched
    );
  }

  
  setUser(): void {
    this.user = {
      id: this.registroForm.get('id')?.value,
      nombre: this.registroForm.get('nombre')?.value,
      apellidos: this.registroForm.get('apellidos')?.value,
      edad: this.registroForm.get('edad')?.value,
      email: this.registroForm.get('email')?.value,
      password: this.registroForm.get('password')?.value,
    };
    this.nombre = this.registroForm.get('nombre')?.value
    this.apellidos = this.registroForm.get('apellidos')?.value
    this.edad = this.registroForm.get('edad')?.value
    this.email =  this.registroForm.get('email')?.value
  }


}
