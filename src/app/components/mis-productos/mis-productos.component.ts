import { Component, Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Producto } from '../../models/producto';
import { User } from '../../models/user';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-mis-productos',
  templateUrl: './mis-productos.component.html',
  styleUrls: ['./mis-productos.component.css'],
})
@Injectable({
  providedIn: 'root',
})
export class MisProductosComponent implements OnInit {
  productos!: Producto[];
  user!: User;

  id!: Number;

  selectedProducto!: Producto;

  constructor(
    public authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.idUser();
  }

  idUser() {
    this.authService.perfil(this.user).subscribe(
      (data: any) => {
        console.log('Perfil del usuario');
        console.log(data['nombre']);
        this.id = data['id'];
        data['id'] = this.route.snapshot.params['id'];
        this.authService.misProductos(this.id).subscribe(
          (data: any) => {
            this.router.navigate(['/productos/usuario/' + this.id]);
            this.productos = data.productos;
            console.log('Mis productos');
            console.log(this.productos);
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



  onSelectAtualizarComentarios(producto: Producto): void {
    this.selectedProducto = producto;
    console.log(producto)
    this.authService.comentariosProducto(producto.id).subscribe((data: any) => {
      this.router.navigate(['/update/producto/' + producto.id]);
      
    }, error =>{
      console.log(error);

    });
  }


//seleccionar
  onSelectComentarios2(producto: Producto): void {
    this.selectedProducto = producto;
    console.log(producto);
    this.authService.comentariosProducto(producto.id).subscribe(
      (data: any) => {
        this.router.navigate(['/comentarios/producto/' + producto.id]);
      },
      (error) => {
        console.log(error);
      }
    );
  }



//eliminar
onSelectComentarios(producto: Producto) {
    this.selectedProducto = producto;
    console.log(producto);
    this.authService.deleteproducto(producto.id).subscribe(
      (data: any) => {
        console.log(producto.id);
        console.log('Producto eliminar');
        console.log(producto);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
