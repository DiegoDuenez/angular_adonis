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
  id!: Int16Array;
  nombre!: String;
  apellidos!: String;
  edad!: Int16Array;
  email!: String;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.perfil(this.user).subscribe(
      (data: any) => {
        this.router.navigate(['/perfil']);
        console.log('Perfil del usuario');
        console.log(data['nombre']);
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
}
