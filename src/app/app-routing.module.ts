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
import { ComentariosNewComponent } from './components/comentarios-new/comentarios-new.component';

import { ProductosNewComponent } from './components/productos-new/productos-new.component';
import { ProductoUpdateComponent } from './components/producto-update/producto-update.component';
import { ComentarioUpdateComponent } from './components/comentario-update/comentario-update.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: 'login', component: FormInicioSesionComponent },
  { path: 'registro', component: FormRegistroComponent },
  { path: 'perfil', component: UsuarioPerfilComponent, canActivate: [AuthGuard]},
  { path: 'usuarios', component: UsuariosComponent , canActivate: [AuthGuard]},
  { path: 'usuarios/:id', component: UsuariosComponent, canActivate: [AuthGuard]},
  { path: 'productos', component: ProductosComponent, canActivate: [AuthGuard] },
  { path: 'productos/:id', component: ProductosComponent, canActivate: [AuthGuard] },
  { path: 'productos/usuario/:id', component: MisProductosComponent, canActivate: [AuthGuard] },
  { path: 'registrar/comentarios', component: ComentariosNewComponent, canActivate: [AuthGuard] },
  { path: 'registrar/productos', component: ProductosNewComponent, canActivate: [AuthGuard] },
  { path: 'actualizar/productos', component: ProductoUpdateComponent, canActivate: [AuthGuard]},
  { path: 'actualizar/producto/:id', component: ProductoUpdateComponent, canActivate: [AuthGuard]},
  { path: 'actualizar/comentario/:id', component: ComentarioUpdateComponent, canActivate: [AuthGuard]},
  { path: 'actualizar/comentarios', component: ComentarioUpdateComponent, canActivate: [AuthGuard]},
  { path: 'comentarios/producto/:id', component: ComentariosProductoComponent, canActivate: [AuthGuard] },
  { path: 'comentarios/productos', component: ComentariosProductoComponent, canActivate: [AuthGuard] },
  { path: 'comentarios/usuario/:id', component: ComentariosUsuarioComponent , canActivate: [AuthGuard]},
  { path: 'comentarios/usuarios', component: ComentariosUsuarioComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
