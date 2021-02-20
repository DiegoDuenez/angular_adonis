import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
  NgForm,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Producto } from 'src/app/models/producto';
import { AuthService } from 'src/app/services/auth.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-producto-update',
  templateUrl: './producto-update.component.html',
  styleUrls: ['./producto-update.component.css'],
})
export class ProductoUpdateComponent implements OnInit {
  registroForm!: FormGroup;
  producto!: Producto;
  user!: User;
  id2!: Number;
  idParam!:Number;
  selectedProducto!:Producto;
  nameUser!: String;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.crearForm();
  }

  ngOnInit(): void {
    this.idParam = this.route.snapshot.params['id'];

    this.idUser()
  }

  idUser() {
    this.authService.perfil(this.user).subscribe(
      (data: any) => {
       
        this.id2 = data['id'];
        this.nameUser = data['nombre']
        console.log(this.nameUser)
        this.authService.misProductos(this.id2).subscribe(
          (data: any) => {
            this.producto = data.productos;
            console.log(this.producto)
            
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



  registroPro(): void {
    
    if (this.registroForm.invalid) {
      return Object.values(this.registroForm.controls).forEach((control) => {
        control.markAsTouched();
      });
    } else {
      this.setData();
     
      this.authService.actualizarProduct(this.producto,this.idParam).subscribe(
        (data) => {
          this.router.navigate(['/misproductos/usuario/' + this.id2])
          
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  crearForm(): void {
    this.registroForm = this.fb.group({
      nombre_producto: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      precio: ['', [Validators.required]],
    });
  }

  get nombre_productoValidate() {
    return (
      this.registroForm.get('nombre_producto')?.invalid &&
      this.registroForm.get('nombre_producto')?.touched
    );
  }

  get descripcionValidate() {
    return (
      this.registroForm.get('descripcion')?.invalid &&
      this.registroForm.get('descripcion')?.touched
    );
  }

  get precioValidate() {
    return (
      this.registroForm.get('precio')?.invalid &&
      this.registroForm.get('precio')?.touched
    );
  }



  setData(): void {
    this.producto = {
      id: this.registroForm.get('id')?.value,
      nombre_producto: this.registroForm.get('nombre_producto')?.value,
      descripcion: this.registroForm.get('descripcion')?.value,
      precio: this.registroForm.get('precio')?.value,
      user_id: this.id2,
      nombre: this.registroForm.get('nombre')?.value,
    };
  }
}
