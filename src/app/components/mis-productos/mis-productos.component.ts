import { Component, Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Producto } from '../../models/producto';
import { User } from '../../models/user';
import { Observable, Subscription } from 'rxjs';

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
  suscription!: Subscription;
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
        this.id = data['id'];
        data['id'] = this.route.snapshot.params['id'];
        this.authService.misProductos(this.id).subscribe(
          (data: any) => {
            this.router.navigate(['/misproductos/usuario/' + this.id]);
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



  onSelectAtualizarComentarios(producto: Producto): void {
    this.selectedProducto = producto;

    this.authService.comentariosProducto(producto.id).subscribe((data: any) => {
      this.router.navigate(['/actualizar/producto/' + producto.id]);
      
    }, error =>{
      console.log(error);

    });
  }


//seleccionar
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



//eliminar
  onDeleteProducto(producto: Producto) {
    this.selectedProducto = producto;
    let index = this.productos.findIndex( e => e.id == this.selectedProducto.id);
    if(index !== -1){
      this.productos.splice(index, 1);
    }
    
    console.log(producto);
    this.authService.deleteproducto(producto.id).subscribe(
      (data: any) => {
      
       
      },
      (error) => {
        console.log(error);
      }
    );
  }

  

  
}
