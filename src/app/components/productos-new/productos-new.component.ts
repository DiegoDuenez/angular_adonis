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
  selector: 'app-productos-new',
  templateUrl: './productos-new.component.html',
  styleUrls: ['./productos-new.component.css'],
})
export class ProductosNewComponent implements OnInit {
  registroForm!: FormGroup;
  productos!: Producto;
  user!: User;
  id2!: Number;
  

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.crearForm();
  }

  ngOnInit(): void {
    this.idUser()
    
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


  registroPro(): void {
    
    if (this.registroForm.invalid) {
      return Object.values(this.registroForm.controls).forEach((control) => {
        control.markAsTouched();
      });
    } else {
      this.setData();
      this.authService.registroProduct(this.productos).subscribe(
        (data) => {
          this.router.navigate(['misproductos/usuario/' + this.id2]);
       
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
    this.productos = {
      id: this.registroForm.get('id')?.value,
      nombre_producto: this.registroForm.get('nombre_producto')?.value,
      descripcion: this.registroForm.get('descripcion')?.value,
      precio: this.registroForm.get('precio')?.value,
      user_id: this.id2,
      nombre:  this.registroForm.get('nombre')?.value,
    };
  }
}
