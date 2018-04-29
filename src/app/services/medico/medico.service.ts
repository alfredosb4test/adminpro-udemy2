import { Injectable } from '@angular/core';
import { Medico } from '../../models/medico.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { URL_SERVICIOS } from '../../config/config';
import { SubirArchivoService } from '../../services/subir-archivo/subir-archivo.service';
import { UsuarioService } from '../../services/usuario/usuario.service';
import swal from 'sweetalert2';

import 'rxjs/add/operator/map';

@Injectable()
export class MedicoService {
	medico: Medico;
	token:string;

  constructor(public http: HttpClient,
  			  public router: Router,
              public _subirArchivoService: SubirArchivoService,
              public _usuarioService: UsuarioService ) { 
  	console.log("MedicoService listo")
  	this.cargarStorage();
  }

  cargarStorage(){
  	if(localStorage.getItem('token')){
		this.token = localStorage.getItem('token'); 
	}else{
		this.token = ''; 
	}
  }

  cargarMedicos( desde: number = 0 ){
    let url = URL_SERVICIOS + "/medico?desde=" + desde;

    return this.http.get(url);
  }
  cargarMedico( id: string ){
    let url = URL_SERVICIOS + "/medico/" + id;

    return this.http.get(url)
    	.map( (resp: any) =>  resp.medico );
  }
  buscarMedicos( termino:string ){
    
    let url = URL_SERVICIOS + "/busqueda/coleccion/medicos/" + termino;
    return this.http.get(url).
              map( (resp:any) => resp.medicos )
  }  

	crearMedico( medico: string ){


		let url = URL_SERVICIOS+'/medico?token=' + this.token;
		console.log("HospitalService.crearHospital url: ", url)
		return this.http.post( url, {nombre: medico})
			.map( (resp:any) =>{

	        console.log("MedicoService.crearMedico: ", resp)
	        //swal('hospital Creado', hospital.nombre, 'success');
	        return true
			});   	
	} 
	guardarMedico( medico: Medico ){

		let url = URL_SERVICIOS+'/medico';

		if( medico._id){
			// actualizar			
			url += '?token=' + this._usuarioService.token;
			url += '&id=' + medico._id;
			return this.http.put( url, medico)
				.map( (resp:any) =>{
		        console.log("HospitalService.actualizadMedico: ", resp)
		        swal('Medico Actualizado', medico.nombre, 'success');
		        return resp.medico;
				});			
		}else{
			// guardar
			url += '?token=' + this._usuarioService.token;
			console.log("HospitalService.guardarMedico url: ", url)
			//medico.usuario = this._usuarioService.usuario;
			return this.http.post( url, medico)
				.map( (resp:any) =>{

		        console.log("HospitalService.guardarMedico: ", resp)
		        swal('Medico Creado', medico.nombre, 'success');
		        return resp.medico;
				});			
		}
   		
	}    

	borrarMedico(id: string){
  	let url = URL_SERVICIOS+'/medico/' + id;
  	url += "&token="+this.token;
  	console.log("HospitalService.borrarMedico url: ", url)
  	return this.http.delete( url )
   		.map( (resp:any) =>{

	        console.log("HospitalService.borrarMedico: ", resp)
	        swal('Medico Borrado', 'Eliminado correctamente', 'success');
	        return true
  		});   	
  	}


}
