import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Producto } from '../../models/producto';
import { Comentario } from '../../models/comentario';
import { User } from '../../models/user';


@Component({
  selector: 'app-productos-usuario',
  templateUrl: './productos-usuario.component.html',
  styleUrls: ['./productos-usuario.component.css']
})
export class ProductosUsuarioComponent implements OnInit {

  producto!: Producto[];
  usuario!: User;
  idParam!: Number;
  usuarios!: User[];
  productos!: Producto[];
  selectedId!: Number;
  selectedProducto!: Producto;

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
          this.router.navigate(['/producto/usuarios']);
          this.productos = data.productos;

          this.authService.usuarios().subscribe((data: any) => {
            this.usuarios = data.usuarios
           
          })
          
        },
        (error) => {
          console.log(error);
        }
      );
    } 
    else if (this.idParam) {
      this.authService.productosUsuario(this.idParam).subscribe(
        (data: any) => {
          this.router.navigate(['/producto/usuario/' + this.idParam]);
          this.productos = data.productos
          console.log(this.productos)

          this.authService.usuarios().subscribe((data: any) => {
            this.usuarios = data.usuarios
            
          })
          
        },
        (error) => {
          console.log(error);
        }
      );
    }


  }

  selectChangeHandler(event: any) {
    this.selectedId = event.target.value;
    
    this.authService.productosUsuario(this.selectedId).subscribe(
      (data: any) => {
        this.router.navigate(['/producto/usuario/' + this.selectedId]);
        this.productos = data.productos
        console.log(this.productos)
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onSelectComentarios(producto: Producto): void {
    this.selectedProducto = producto;
  
    this.authService.comentariosProducto(this.selectedProducto.id).subscribe(
      (data: any) => {
        this.router.navigate(['/comentarios/producto/' + this.selectedProducto.id]);
      },
      (error) => {
        console.log(error);
      }
    );
  }


}
