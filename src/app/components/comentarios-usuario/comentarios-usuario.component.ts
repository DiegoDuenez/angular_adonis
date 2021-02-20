import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Comentario } from '../../models/comentario';
import { Producto } from '../../models/producto';
import { User } from '../../models/user';

@Component({
  selector: 'app-comentarios-usuario',
  templateUrl: './comentarios-usuario.component.html',
  styleUrls: ['./comentarios-usuario.component.css'],
})
export class ComentariosUsuarioComponent implements OnInit {
  usuario!: User;
  usuarios!: User[];
  producto!: Producto;
  productos!: Producto[];
  //comentario!: Comentario;
  comentarios!: Comentario[];
  idParam!: Number;
  selectedId!: Number;
  userNombre!: String;
  prodNombre!: String;
  selectedproducto!: Comentario;
  selectedProducto2!:Comentario;
  selectedComentario!:Comentario;
  id!: Number;
  canDelete!: boolean;
  canUpdate!: boolean;

  constructor(
    public authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.idParam = this.route.snapshot.params['id'];
    this.userId()
    this.authService.productos().subscribe(
      (data: any) => {
        this.productos = data.productos;
      
        
      },
      (error) => {
        console.log(error);
      }
    );
    if (this.idParam) {
      this.authService.comentariosUsuario(this.idParam).subscribe(
        (data: any) => {
          this.router.navigate(['/comentarios/usuario/' + this.idParam]);
          this.comentarios = data.comentarios;
          this.http.get('http://127.0.0.1:3333/usuarios').subscribe(
            (data: any) => {
              this.usuarios = data.usuarios;
              if (this.comentarios.length == 0) {
                console.log('Array vacio');
              }
              for (let user of this.usuarios) {
                if (this.idParam == user.id) {
                  
                  this.userNombre = user.nombre;
                  
                }
              }
              for (let prod of this.productos) {
                for (let coment of this.comentarios) {
                  if (coment.producto_id == prod.id) {
                    this.prodNombre = prod.nombre_producto;
                  }
                }
              }
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
    } else {
      this.authService.comentarios().subscribe(
        (data: any) => {
          this.router.navigate(['/comentarios/usuarios']);
          this.comentarios = data.comentarios;
          console.log(this.comentarios)
          this.http.get('http://127.0.0.1:3333/usuarios').subscribe(
            (data: any) => {
              this.usuarios = data.usuarios;
              if (this.comentarios.length == 0) {
                console.log('Array vacio');
              }
              for (let user of this.usuarios) {
                for (let coment of this.comentarios) {
                  if (coment.user_id == user.id) {
                    
                    this.userNombre = user.nombre;
                    
                  }
                }
              }
              for (let prod of this.productos) {
                for (let coment of this.comentarios) {
                  if (coment.producto_id == prod.id) {
                    
                    this.prodNombre = prod.nombre_producto;
                    
                  }
                }
              }
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
  }

  selectChangeHandler(event: any) {
    this.selectedId = event.target.value;
  
    this.authService.comentariosUsuario(this.selectedId).subscribe(
      (data: any) => {
        this.router.navigate(['/comentarios/usuario/' + this.selectedId]);
        this.comentarios = data.comentarios;
        console.log(this.comentarios)
        if (this.comentarios.length == 0) {
          console.log('Array vacio');
        }
        for (let user of this.usuarios) {
          if (this.selectedId == user.id) {
            this.userNombre = user.nombre;
          }
        }
        for (let prod of this.productos) {
          for (let coment of this.comentarios) {
            if (coment.producto_id == prod.id) {
            
              this.prodNombre = prod.nombre_producto;
              
            }
          }
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }


  onSelectAtualizarComentarios(comentario: Comentario): void {
    this.selectedProducto2 = comentario;
    if(this.selectedProducto2.user_id == this.id){
      this.canUpdate = true;  
      this.authService.comentariosUsuario(this.selectedProducto2.id).subscribe((data: any) => {
        this.router.navigate(['/actualizar/comentario/' + this.selectedProducto2.id]);
      }, error =>{
        console.log(error);
  
      });
      

    
    }else{
      
      this.canUpdate = false;
    }
    
  }

  onSelectComentarios2(comentar: Comentario): void {
    this.selectedProducto2 = comentar;
    this.authService.comentariosActualizar(this.selectedProducto2,this.idParam).subscribe(
      (data: any) => {
        this.router.navigate(['/update/comentario/' + this.selectedProducto2.id]);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onDeletecomentarioUsuario(comentario: Comentario) {
    this.selectedComentario = comentario;
    if(this.selectedComentario.user_id == this.id){
      this.canDelete = true;  
      let index = this.comentarios.findIndex( e => e.id == this.selectedComentario.id);
      if(index !== -1){
        this.comentarios.splice(index, 1);
      }
      this.authService.deletecomentario(comentario.id).subscribe(
        (data: any) => {    
               
        },
        (error) => {
          console.log(error);
        }
      );
    }
    else{
      this.canDelete = false;
    }
  }

  userId() {
    this.authService.perfil(this.usuario).subscribe(
      (data: any) => {
        
        this.id = data['id'];
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
