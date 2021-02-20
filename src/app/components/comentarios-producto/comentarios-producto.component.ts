import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { Comentario } from '../../models/comentario';
import { Producto } from '../../models/producto';
import { User } from '../../models/user';
import { Location } from '@angular/common';



@Component({
  selector: 'app-comentarios-producto',
  templateUrl: './comentarios-producto.component.html',
  styleUrls: ['./comentarios-producto.component.css'],
})
export class ComentariosProductoComponent implements OnInit {

  registroForm!: FormGroup;
  usuario!: User;
  usuarios!: User[];
  producto!: Producto;
  productos!: Producto[];
  comentario!: Comentario;
  comentar!: Comentario;
  comentarios!: Comentario[];
  selectedProducto!: Comentario;
  idParam!: Number;
  selectedId!: Number;
  userNombre!: String;
  prodNombre!: String;
  idUser!: Number;
  id!: Number
  canDelete!: boolean;
  canUpdate!: boolean;
  selectedComentario!: Comentario;
  nomUser!: String;
  selectIdProducto!: Number;

  suscription!: Subscription;

  tuyo!: boolean;
  noTuyo!: boolean;


  constructor(
    private fb: FormBuilder,
    public authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient,
    public location: Location
    
  ) { this.crearForm() 
  
  
  }

  ngOnInit() {
    this.idParam = this.route.snapshot.params['id'];
    
    
    this.userId()
    

    this.authService.usuarios().subscribe(
      (data: any) => {
        this.usuarios = data.usuarios;

      },
      (error) => {
        console.log(error);
      }
    );
    if (this.idParam) {
      console.log(this.idParam)
      this.authService.comentariosProducto(this.idParam).subscribe(
        (data: any) => {
          this.router.navigate(['/comentarios/producto/' + this.idParam]);
          this.comentarios = data.comentarios;
          
         
          this.http.get('http://127.0.0.1:3333/productos').subscribe(
            (data: any) => {
              this.productos = data.productos;

              
              if (this.comentarios.length == 0) {
                console.log('Array vacio');
              }
              for (let prod of this.productos) {
                if (this.idParam == prod.id) {
                  
                  this.prodNombre = prod.nombre_producto;
                  
                }
              }
             
              for (let user of this.usuarios) {
                for (let coment of this.comentarios) {
                  if (coment.user_id == user.id) {
                  
                    this.userNombre = user.nombre;
                    
                   
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
          this.router.navigate(['/comentarios/productos']);
          this.comentarios = data.comentarios;
          
          this.http.get('http://127.0.0.1:3333/productos').subscribe(
            (data: any) => {
              this.productos = data.productos;
              
              if (this.comentarios.length == 0) {
                console.log('Array vacio');
              }
              for (let prod of this.productos) {
                for (let coment of this.comentarios) {
                  if (coment.producto_id == prod.id) {
                    
                    this.prodNombre = prod.nombre_producto;
                    
                  }
                }
              }
              for (let user of this.usuarios) {
                for (let coment of this.comentarios) {
                  if (coment.user_id == user.id) {
                  
                    this.userNombre = user.nombre;
                    
                   
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

  userId() {
    this.authService.perfil(this.usuario).subscribe(
      (data: any) => {
        
        this.id = data['id'];
        this.nomUser = data['nombre']
        
        
      },
      (error) => {
        console.log(error);
      }
    );
  }

  

  selectChangeHandler(event: any) {
    this.selectedId = event.target.value;
    
    this.idParam = this.selectedId
    
    
    this.authService.comentariosProducto(this.selectedId).subscribe(
      (data: any) => {
        this.router.navigate(['/comentarios/producto/' + this.selectedId]);
        this.comentarios = data.comentarios;
        
        if (this.comentarios.length == 0) {
          console.log('Array vacio');
        }
        for (let prod of this.productos) {
          if (this.selectedId == prod.id) {
           
            this.prodNombre = prod.nombre_producto;
            
          }
        }
        for (let user of this.usuarios) {
          for (let coment of this.comentarios) {
            if (coment.user_id == user.id) {
              
              this.userNombre = user.nombre;
              
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
    this.selectedProducto = comentario;
    if(this.selectedProducto.user_id == this.id){
      this.canUpdate = true;  
      this.authService.comentariosUsuario(this.selectedProducto.id).subscribe((data: any) => {
        this.router.navigate(['/actualizar/comentario/' + this.selectedProducto.id]);
      }, error =>{
        console.log(error);
  
      });

    
    }else{
      this.canUpdate = false;
    }
    
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


  // - - - - -  PARA COMENTAR PRODUCTOS - - - - - 

  registroPro(): void {
   
    if (this.registroForm.invalid) {
      return Object.values(this.registroForm.controls).forEach((control) => {
        control.markAsTouched();
      });
    } else {
      this.setUser();
     

      this.router.navigateByUrl('/comentarios/producto/' + this.idParam)
      this.authService.comentariosNew(this.comentar).subscribe(
        (data: any) => {
          
         
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
      user_id: this.id,
      producto_id: this.idParam,
      created_at: this.registroForm.get('created_at')?.value,
      updated_at: this.registroForm.get('updated_at')?.value,
      nombre: this.registroForm.get('nombre_user')?.value,
      nombre_producto: this.registroForm.get('nombre_prod')?.value
      
    
    };
    
  }

  /*refresh(): void{
    this.router.navigateByUrl('/comentarios/producto/' + this.idParam, {skipLocationChange:true}).then(() => {
      console.log(decodeURI(this.location.path()))
      this.router.navigate([ decodeURI(this.location.path())])
    })
  }*/

  
 

 
}
