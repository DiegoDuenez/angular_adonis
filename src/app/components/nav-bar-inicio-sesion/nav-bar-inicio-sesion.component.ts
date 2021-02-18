import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Producto } from '../../models/producto';
import { User } from '../../models/user';

import { MisProductosComponent } from '../mis-productos/mis-productos.component';

@Component({
  selector: 'app-nav-bar-inicio-sesion',
  templateUrl: './nav-bar-inicio-sesion.component.html',
  styleUrls: ['./nav-bar-inicio-sesion.component.css'],
})
export class NavBarInicioSesionComponent implements OnInit {
  productos!: Producto[];
  user!: User;
  id!: Number;

  constructor(
    public authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    public misProds: MisProductosComponent
  ) {}

  ngOnInit(): void {}
}
