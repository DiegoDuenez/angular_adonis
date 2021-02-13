import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { User } from '../../models/user';


@Component({
  selector: 'app-form-registro',
  templateUrl: './form-registro.component.html',
  styleUrls: ['./form-registro.component.css']
})
export class FormRegistroComponent implements OnInit {

  registroForm!: FormGroup;

  user!: User;
  

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.crearForm();
   }

  ngOnInit(): void {
  }

  registro(): void{
    console.log(this.registroForm.value)

    if(this.registroForm.invalid){
      return Object.values(this.registroForm.controls).forEach(control =>{
        control.markAsTouched();
      });
    }
    else{
      this.setUser();
      this.authService.registro(this.user).subscribe((data: any) => {
        this.router.navigate(['/login']);
        console.log("Registro completado");
      }, error =>{
        console.log(error)

      });
    }

  }

  crearForm(): void{
    this.registroForm = this.fb.group({
      nombre: ['', [Validators.required]],
      apellidos: ['', [Validators.required]],
      edad: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  get nombreValidate(){
    return( this.registroForm.get('nombre')?.invalid && this.registroForm.get('nombre')?.touched);
  }

  get apellidosValidate(){
    return( this.registroForm.get('apellidos')?.invalid && this.registroForm.get('apellidos')?.touched);
  }

  get edadValidate(){
    return( this.registroForm.get('edad')?.invalid && this.registroForm.get('edad')?.touched);
  }

  get emailValidate(){
    
    return( this.registroForm.get('email')?.invalid && this.registroForm.get('email')?.touched);
  }

  get passwordValidate(){
    return(
      this.registroForm.get('password')?.invalid && this.registroForm.get('password')?.touched
    );
  }

  setUser(): void{
    this.user = {
      id: this.registroForm.get('id')?.value,
      nombre: this.registroForm.get('nombre')?.value,
      apellidos: this.registroForm.get('apellidos')?.value,
      edad: this.registroForm.get('edad')?.value,
      email: this.registroForm.get('email')?.value,
      password: this.registroForm.get('password')?.value,
    }
  }
  
 


}

