import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormInicioSesionComponent } from './components/form-inicio-sesion/form-inicio-sesion.component';
import { FormRegistroComponent } from './components/form-registro/form-registro.component';
import { UsuarioPerfilComponent } from './components/usuario-perfil/usuario-perfil.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { ProductosComponent } from './components/productos/productos.component';
import { MisProductosComponent } from './components/mis-productos/mis-productos.component';
import { ComentariosProductoComponent } from './components/comentarios-producto/comentarios-producto.component';
import { ComentariosUsuarioComponent } from './components/comentarios-usuario/comentarios-usuario.component';



const routes: Routes = [

  {path:'login', component:FormInicioSesionComponent},
  {path:'registro', component:FormRegistroComponent},
  {path:'perfil', component: UsuarioPerfilComponent},
  {path: 'usuarios', component: UsuariosComponent},
  {path: 'usuarios/:id', component: UsuariosComponent},
  {path: 'productos', component: ProductosComponent},
  {path: 'productos/:id', component: ProductosComponent},
  {path: 'productos/usuario/:id', component: MisProductosComponent},
  
  {path: 'misproductos', component: MisProductosComponent},
  {path: 'comentarios/producto/:id', component: ComentariosProductoComponent},
  {path: 'comentarios/productos', component: ComentariosProductoComponent},
  {path: 'comentarios/usuario/:id', component: ComentariosUsuarioComponent},
  {path: 'comentarios/usuarios', component: ComentariosUsuarioComponent},
  {path:'', redirectTo:'login', pathMatch:'full'},
  {path:'**', redirectTo:'login'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
