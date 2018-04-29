import { Injectable } from '@angular/core';
import { Hospital } from '../../models/hospital.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { URL_SERVICIOS } from '../../config/config';
import { SubirArchivoService } from '../../services/subir-archivo/subir-archivo.service';
import swal from 'sweetalert2';

import 'rxjs/add/operator/map';

@Injectable()
export class HospitalService {

	hospital:Hospital;
	token:string;

  constructor(public http: HttpClient,
  			  public router: Router,
              public _subirArchivoService: SubirArchivoService ) { 
  	console.log("Hospital.service listo");
  	this.cargarStorage();
  }
  cargarStorage(){
  	if(localStorage.getItem('token')){
		  this.token = localStorage.getItem('token'); 
	  }else{
		  this.token = ''; 
	  }
  }

  // retorna un observable con todos los hospitales paginados
  cargarHospitales(desde: number = 0){
    let url = URL_SERVICIOS + "/hospital?desde=" + desde;

    return this.http.get(url);
  }
  // retorna un observable con todos los hospitales
  cargarHospitales_sinpaginar(){
    let url = URL_SERVICIOS + "/hospital/allHospitales";

    return this.http.get(url);
  }
  // Esta función recibe un ID de un hospital y retorna toda la información del mismo
  obtenerHospital( id: string ){
    let url = URL_SERVICIOS + "/hospital/" + id;
    return this.http.get(url)
      .map( (resp:any) => resp.hospital );
  }

  actualizarHospital( hospital ){
  	let url = URL_SERVICIOS+'/hospital?id=' + hospital._id;
  	url += "&token="+this.token;

  	return this.http.put( url, hospital)
   		.map( (resp:any) =>{

	        console.log("HospitalService.actualizarHospital: ", resp)
	        swal('hospital Actualizado', hospital.nombre, 'success');
	        return resp
  		}); 
  	//console.log('HospitalService.actualizarHospital: ', hospital)
  }

  buscarHospitales( termino:string ){
    
    let url = URL_SERVICIOS + "/busqueda/coleccion/hospitales/" + termino;
    return this.http.get(url).
              map( (resp:any) => resp.hospitales )
  }

  crearHospital( hospital: string ){
 

  	let url = URL_SERVICIOS+'/hospital?token=' + this.token;
  	console.log("HospitalService.crearHospital url: ", url)
  	return this.http.post( url, {nombre: hospital})
   		.map( (resp:any) =>{

	        console.log("HospitalService.crearHospital: ", resp)
	        //swal('hospital Creado', hospital.nombre, 'success');
	        return true
  		});   	
  }  

  borrarHospital( hospital: Hospital ){

  	let url = URL_SERVICIOS+'/hospital?token=' + this.token;
  	url += "&id="+hospital._id;

  	return this.http.delete( url )
   		.map( (resp:any) =>{

	        console.log("HospitalService.crearHospital: ", resp)
	        swal('hospital Borrado', 'Eliminado correctamente', 'success');
	        return true
  		});   	
  }

}
