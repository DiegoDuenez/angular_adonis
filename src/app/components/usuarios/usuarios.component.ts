import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css'],
})
export class UsuariosComponent implements OnInit {
  usuario!: User;
  usuarios!: User[];
  idParam!: Number;
  selectedId!: Number;
  constructor(
    public authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.idParam = this.route.snapshot.params['id'];
    if (!this.idParam) {
      this.authService.usuarios().subscribe(
        (data: any) => {
          this.router.navigate(['/usuarios']);
          this.usuarios = data.usuarios;
         
        },
        (error) => {
          console.log(error);
        }
      );
    } else if (this.idParam) {
      this.authService.usuarios(this.idParam).subscribe(
        (data: any) => {
          this.router.navigate(['/usuarios/' + this.idParam]);
          this.usuario = data.usuario;
        
          this.http.get('http://127.0.0.1:3333/usuarios').subscribe(
            (data: any) => {
              this.usuarios = data.usuarios;
            },
            (error) => {
              console.log(error);
            }
          );
          this.usuario = {
            id: data.usuario.id,
            nombre: data.usuario.nombre,
            apellidos: data.usuario.apellidos,
            edad: data.usuario.edad,
            email: data.usuario.email,
            password: data.usuario.password,
          };
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  selectChangeHandler(event: any) {
    this.selectedId = event.target.value;
    this.authService.usuarios(this.selectedId).subscribe(
      (data: any) => {
        this.router.navigate(['/usuarios/' + this.selectedId]);
        this.usuario = data.usuario;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
