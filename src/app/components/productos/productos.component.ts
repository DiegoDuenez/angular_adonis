import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Producto } from '../../models/producto';
import { Comentario } from '../../models/comentario';
import { User } from '../../models/user';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css'],
})
export class ProductosComponent implements OnInit {
  producto!: Producto[];
  usuario!: User;
  usuarios!: User[];
  productos!: Producto[];
  idParam!: Number;
  selectedId!: Number;
  selectedComentarios!: Comentario;
  selectedProducto!: Producto;
  selectedproducto!: Comentario;

  constructor(
    public authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.idParam = this.route.snapshot.params['id'];
    if (!this.idParam) {
      this.authService.productos().subscribe(
        (data: any) => {
          this.router.navigate(['/productos']);
          this.productos = data.productos;
         
          
        },
        (error) => {
          console.log(error);
        }
      );
    } else if (this.idParam) {
      this.authService.productos(this.idParam).subscribe(
        (data: any) => {
          this.router.navigate(['/productos/' + this.idParam]);
          this.producto = data.producto;
         
          this.http.get('http://127.0.0.1:3333/productos').subscribe(
            (data: any) => {
              this.productos = data.productos;
             
            },
            (error) => {
              console.log(error);
            }
          );
          /*this.producto = {
            id: data.producto.id,
            nombre_producto: data.producto.nombre_producto,
            descripcion: data.producto.descripcion,
            precio: data.producto.precio,
            user_id: data.producto.user_id,
            nombre: data.producto.nombre
          };*/
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  selectChangeHandler(event: any) {
    this.selectedId = event.target.value;
    
    this.authService.productos(this.selectedId).subscribe(
      (data: any) => {
        this.router.navigate(['/productos/' + this.selectedId]);
        this.producto = data.producto;
        
       
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onSelectComentarios(producto: Producto): void {
    this.selectedProducto = producto;
  
    this.authService.comentariosProducto(producto.id).subscribe(
      (data: any) => {
        this.router.navigate(['/comentarios/producto/' + producto.id]);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onDeletecomentario(comentario: Comentario) {
    this.selectedproducto = comentario;
    

    this.authService
      .deletecomentario(comentario.id)

      .subscribe(
        (data: any) => {
         
        },
        (error) => {
          console.log(error);
        }
      );
  }
}
