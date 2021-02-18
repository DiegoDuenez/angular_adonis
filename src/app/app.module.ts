import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { FormRegistroComponent } from './components/form-registro/form-registro.component';
import { FormInicioSesionComponent } from './components/form-inicio-sesion/form-inicio-sesion.component';
import { UsuarioPerfilComponent } from './components/usuario-perfil/usuario-perfil.component';

import { AuthInterceptorService } from './services/auth-interceptor.service';
import { NavBarInicioSesionComponent } from './components/nav-bar-inicio-sesion/nav-bar-inicio-sesion.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { ProductosComponent } from './components/productos/productos.component';
import { MisProductosComponent } from './components/mis-productos/mis-productos.component';
import { ComentariosUsuarioComponent } from './components/comentarios-usuario/comentarios-usuario.component';
import { ComentariosProductoComponent } from './components/comentarios-producto/comentarios-producto.component';
import { ComentarComponent } from './comentar/comentar.component';
import { ComentariosNewComponent } from './components/comentarios-new/comentarios-new.component';
import { ProductosNewComponent } from './components/productos-new/productos-new.component';
import { UsuariosUpdateComponent } from './components/usuarios-update/usuarios-update.component';
import { ProductoUpdateComponent } from './components/producto-update/producto-update.component';
import { ComentarioUpdateComponent } from './components/comentario-update/comentario-update.component';

import { AuthGuard } from './guards/auth.guard'

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    FormRegistroComponent,
    FormInicioSesionComponent,
    UsuarioPerfilComponent,
    NavBarInicioSesionComponent,
    UsuariosComponent,
    ProductosComponent,
    MisProductosComponent,
    ComentariosUsuarioComponent,
    ComentariosProductoComponent,
    ComentarComponent,
    ComentariosNewComponent,
    ProductosNewComponent,
    UsuariosUpdateComponent,
    ProductoUpdateComponent,
    ComentarioUpdateComponent,
    
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
    
  ],
  providers: [
    {
      
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    },
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
