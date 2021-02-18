import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Comentario } from '../../models/comentario';
import { Producto } from '../../models/producto';
import { User } from '../../models/user';

@Component({
  selector: 'app-comentarios-producto',
  templateUrl: './comentarios-producto.component.html',
  styleUrls: ['./comentarios-producto.component.css'],
})
export class ComentariosProductoComponent implements OnInit {
  usuario!: User;
  usuarios!: User[];
  producto!: Producto;
  productos!: Producto[];
  comentario!: Comentario;
  comentarios!: Comentario[];
  selectedproducto!: Comentario;
  idParam!: Number;
  selectedId!: Number;
  userNombre!: String;
  prodNombre!: String;
  idUser!: Number;

  constructor(
    public authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.idParam = this.route.snapshot.params['id'];

    this.authService.usuarios().subscribe(
      (data: any) => {
        this.usuarios = data.usuarios;
        console.log('Usuarios');
        console.log(this.usuarios);

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
    if (this.idParam) {
      this.authService.comentariosProducto(this.idParam).subscribe(
        (data: any) => {
          this.router.navigate(['/comentarios/producto/' + this.idParam]);
          this.comentarios = data.comentarios;
          console.log('Comentarios');
          console.log(this.comentarios);
          this.http.get('http://127.0.0.1:3333/productos').subscribe(
            (data: any) => {
              this.productos = data.productos;
              console.log('Productos');
              console.log(this.productos);
              if (this.comentarios.length == 0) {
                console.log('Array vacio');
              }
              for (let prod of this.productos) {
                if (this.idParam == prod.id) {
                  console.log('datos usuario');
                  console.log(prod.id);
                  this.prodNombre = prod.nombre_producto;
                  console.log(prod.nombre_producto);
                  console.log(this.prodNombre);
                }
              }
              for (let prod of this.productos) {
                for (let coment of this.comentarios) {
                  if (coment.producto_id == prod.id) {
                    console.log('datos usuario');
                    console.log(prod.id);
                    this.prodNombre = prod.nombre_producto;
                    console.log(prod.nombre_producto);
                    console.log(this.prodNombre);
                  }
                }
              }
              for (let user of this.usuarios) {
                for (let coment of this.comentarios) {
                  if (coment.user_id == user.id) {
                    console.log('datos producto');
                    console.log(user.id);
                    this.userNombre = user.nombre;
                    console.log(user.nombre);
                    console.log(this.userNombre);
                  }
                }
              }
            },
            (error) => {
              console.log(error);
            }
          );
          this.producto = {
            id: data.producto.id,
            nombre_producto: data.producto.nombre_producto,
            descripcion: data.producto.descripcion,
            precio: data.producto.precio,
            user_id: data.producto.user_id,
          };
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      this.authService.comentarios().subscribe(
        (data: any) => {
          this.router.navigate(['/comentarios/productos']);
          this.comentarios = data.comentarios;
          console.log('Comentarios');
          console.log(this.comentarios);
          this.http.get('http://127.0.0.1:3333/productos').subscribe(
            (data: any) => {
              this.productos = data.productos;
              console.log('Productos');
              console.log(this.productos);
              if (this.comentarios.length == 0) {
                console.log('Array vacio');
              }
              for (let prod of this.productos) {
                for (let coment of this.comentarios) {
                  if (coment.producto_id == prod.id) {
                    console.log('datos producto');
                    console.log(prod.id);
                    this.prodNombre = prod.nombre_producto;
                    console.log(prod.nombre_producto);
                    console.log(this.prodNombre);
                  }
                }
              }
              for (let user of this.usuarios) {
                for (let coment of this.comentarios) {
                  if (coment.user_id == user.id) {
                    console.log('datos usuario');
                    console.log(user.id);
                    this.userNombre = user.nombre;
                    console.log(user.nombre);
                    console.log(this.userNombre);
                  }
                }
              }
            },
            (error) => {
              console.log(error);
            }
          );
          this.producto = {
            id: data.producto.id,
            nombre_producto: data.producto.nombre_producto,
            descripcion: data.producto.descripcion,
            precio: data.producto.precio,
            user_id: data.producto.user_id,
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
    console.log(this.selectedId);
    this.authService.comentariosProducto(this.selectedId).subscribe(
      (data: any) => {
        this.router.navigate(['/comentarios/producto/' + this.selectedId]);
        this.comentarios = data.comentarios;
        console.log('Comentarios');
        console.log(this.comentarios);
        if (this.comentarios.length == 0) {
          console.log('Array vacio');
        }
        for (let prod of this.productos) {
          if (this.selectedId == prod.id) {
            console.log('datos usuario');
            console.log(prod.id);
            this.prodNombre = prod.nombre_producto;
            console.log(prod.nombre_producto);
            console.log(this.prodNombre);
          }
        }
        for (let user of this.usuarios) {
          for (let coment of this.comentarios) {
            if (coment.user_id == user.id) {
              console.log('datos producto');
              console.log(user.id);
              this.userNombre = user.nombre;
              console.log(user.nombre);
              console.log(this.userNombre);
            }
          }
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onDeletecomentario(coemnta: Comentario) {
    this.selectedproducto = coemnta;
    console.log(coemnta);
    this.authService.deletecomentario(coemnta.id).subscribe(
      (data: any) => {
        console.log(coemnta.id);
        console.log('Producto eliminar');
        console.log(coemnta);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
