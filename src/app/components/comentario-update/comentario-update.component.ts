import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Comentario } from '../../models/comentario';
import { Producto } from '../../models/producto';
import { User } from '../../models/user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-comentario-update',
  templateUrl: './comentario-update.component.html',
  styleUrls: ['./comentario-update.component.css']
})
export class ComentarioUpdateComponent implements OnInit {
  registroForm!: FormGroup;
  selectedId!: Number;
  comentarios!: Comentario[];
  productos!: Producto[];
  user!: User;
  producto!: Producto;
  idParam!: Number;
  comentar!: Comentario;
  prodNombre!:String;
  id2!: Number;
  selectedProducto!: Number;

  constructor(
    private fb: FormBuilder,
    public authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient
  ) {
    this.crearForm();
  }

  ngOnInit(): void {
    this.idParam = this.route.snapshot.params['id'];

    this.http.get('http://127.0.0.1:3333/productos').subscribe(
      (data: any) => {
        this.productos = data.productos;
        this.producto = {
          id: data.producto.id,
          nombre_producto: data.producto.nombre_producto,
          descripcion: data.producto.descripcion,
          precio: data.producto.precio,
          user_id: data.producto.user_id,
        };

        for (let prod of this.productos) {
            
            this.prodNombre = prod.nombre_producto;
            console.log(prod.nombre_producto);
            console.log(this.prodNombre);
        }

      },
      (error) => {
        console.log(error);
      }
    );
  }








  idUser() {
    this.authService.perfil(this.user).subscribe(
      (data: any) => {
        this.id2 = data['id'];
        this.authService.misProductos(this.id2).subscribe(
          (data: any) => {
            this.productos = data.productos;

          },
          (error) => {
            console.log(error);
          }
        );
      },
      (error) => {
        console.log(error);
      }
    );
  }





  selectChangeHandler(event: any) {
    this.selectedProducto = event.target.value;
    
    this.authService.comentariosProducto(this.selectedProducto).subscribe(
      (data: any) => {
      },
      (error) => {
        console.log(error);
      }
    );
  }

  registroPro(): void {
    
    
    if (this.registroForm.invalid) {
      return Object.values(this.registroForm.controls).forEach((control) => {
        control.markAsTouched();
      });
    } else {
      this.setUser();
      this.authService.comentariosActualizar(this.comentar, this.idParam).subscribe(
        (data) => {
          
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  crearForm(): void {
    this.registroForm = this.fb.group({
      titulo: ['', [Validators.required]],
      contenido: ['', [Validators.required]],
    });
  }

    
  get tituloValidate() {
    return (
      this.registroForm.get('titulo')?.invalid &&
      this.registroForm.get('titulo')?.touched
    );
  }
  get contenidoValidate() {
    return (
      this.registroForm.get('contenido')?.invalid &&
      this.registroForm.get('contenido')?.touched
    );
  }

  setUser(): void {
    this.comentar = {
      id: this.registroForm.get('id')?.value,
      titulo: this.registroForm.get('titulo')?.value,
      contenido: this.registroForm.get('contenido')?.value,
      user_id: this.id2,
      producto_id: this.selectedProducto,
      created_at: this.registroForm.get('created_at')?.value,
      updated_at: this.registroForm.get('updated_at')?.value,
    };
  }
}