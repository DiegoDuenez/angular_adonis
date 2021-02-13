import { Component, Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Producto } from '../../models/producto';
import { User } from '../../models/user';

@Component({
  selector: 'app-mis-productos',
  templateUrl: './mis-productos.component.html',
  styleUrls: ['./mis-productos.component.css']
})
@Injectable({
  providedIn: 'root'
})
export class MisProductosComponent implements OnInit {

  productos!: Producto[]
  user!: User;
  
  id!: Number;

  constructor(public authService: AuthService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.idUser()
    
    /*this.id = this.route.snapshot.params['id'];
    
    
    this.authService.misProductos(this.id).subscribe((data: any) => {
      this.router.navigate(['/productos/usuario/' + this.id]);
      this.productos = data.productos
      console.log("Mis productos2");
      console.log(this.productos)
      
    }, error =>{
      console.log(error)

    });*/

  }

  idUser(){


      this.authService.perfil(this.user).subscribe((data: any) => {
        
        console.log("Perfil del usuario");
        console.log(data['nombre'])
        this.id = data['id']
        data['id'] = this.route.snapshot.params['id'];

        this.authService.misProductos(this.id).subscribe((data: any) => {
          this.router.navigate(['/productos/usuario/' + this.id]);
          this.productos = data.productos
          console.log("Mis productos");
          console.log(this.productos)
          
        }, error =>{
          console.log(error)
    
        });
        
      
      }, error =>{
        console.log(error)

      });
      
    

    
    

    
  }

  
}
