import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { URL_SERVICIOS } from '../../config/config';
import { SubirArchivoService } from '../../services/subir-archivo/subir-archivo.service';
import swal from 'sweetalert2';

import 'rxjs/add/operator/map';

@Injectable()
export class UsuarioService {
	usuario:Usuario;
	token:string;

  constructor(public http: HttpClient,
  			      public router: Router,
              public _subirArchivoService: SubirArchivoService ) { 
  	console.log("servicio listo")
  	this.cargarStorage();
  }

  estaLogeado(){
  	return (this.token.length > 1) ? true : false;
  }

  cargarStorage(){
  	if(localStorage.getItem('token')){
		this.token = localStorage.getItem('token');
		this.usuario = JSON.parse(localStorage.getItem('usuario') );  	
	}else{
		this.token = '';
		this.usuario = null;
	}
  }

  guardarStorage( id:string, token:string, usuario: Usuario ){
	localStorage.setItem('id', id);
	localStorage.setItem('token', token);
	localStorage.setItem('usuario', JSON.stringify( usuario) );

	this.usuario = usuario;
	this.token = token;
  }

  logout(){
	this.usuario = null;
	this.token = '';
	localStorage.removeItem('token');
	localStorage.removeItem('usuario');
	this.router.navigate(['/login']);
  }

  loginGoogle( token:string){
  	let url = URL_SERVICIOS + '/login/google';
  	return this.http.post(url, {token})
  		.map((resp:any)=>{
  			this.guardarStorage(resp.id, resp.token, resp.usuario);
  			return true;
  		})
  		
  }

  login( usuario: Usuario, recordar: Boolean = false){

  	if( recordar ){
  		localStorage.setItem('email', usuario.email);
  	}else{
  		localStorage.removeItem('email');
  	}
  	let url = URL_SERVICIOS + '/login';
  	return this.http.post(url, usuario)
  		.map((resp: any)=>{
  			this.guardarStorage(resp.id, resp.token, resp.usuario);
  			//localStorage.setItem('id', resp.id);
  			//localStorage.setItem('token', resp.token);
  			//localStorage.setItem('usuario', JSON.stringify( resp.usuario) );
  			return true;
  		})
  }

  crearUsuario( usuario: Usuario ){

  	let url = URL_SERVICIOS+'/usuario';
  	return this.http.post( url, usuario)
  		.map( (resp:any) =>{
  			swal('Usuario Creado', usuario.email, 'success')
  			return resp.usuario
  		});
  }

  actualizarUsuario( usuario: Usuario ){
  	let url = URL_SERVICIOS+'/usuario?id=' + usuario._id;
  	url += "&token="+this.token;

  	return this.http.put( url, usuario)
   		.map( (resp:any) =>{
         let usuarioDB: Usuario = resp.usuario;
         console.log("usuarioDB: ", usuarioDB)
        this.guardarStorage( usuarioDB._id, this.token, usuarioDB );
        swal('Usuario Actualizado', usuario.nombre +" / "+usuario.email, 'success');
        return resp.usuario
  		}); 	
  }

  // profile.component.ts
  cambiarImagen( archivo:File, id:string ){
    this._subirArchivoService.subirArchivo( archivo, 'usuarios', id)
        .then( (resp: any) =>{
          console.log(resp)
          this.usuario.img = resp.usuario.img;
          swal('Imagen Actualizada', this.usuario.nombre, 'success');
          this.guardarStorage( id, this.token, this.usuario );
        })
        .catch( resp=>{
          console.log(resp)
        });
  }

}