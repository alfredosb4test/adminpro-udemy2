import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../../config/config';

@Injectable()
export class SubirArchivoService {

  constructor() { }

  subirArchivo( archivo: File, tipo: string, id: string){

  	return new Promise( (resolve, reject) =>{

	  	let formData = new FormData();
	  	let xhr =  new XMLHttpRequest();
	  	console.log("archivo:", archivo, "archivo.name:", archivo.name, "tipo:", tipo, "id:", id)
	  	formData.append('imagen', archivo, archivo.name);

	  	xhr.onreadystatechange = function(){
	  		// si la imagen termino el proceso de subida
	  		if (xhr.readyState === 4) {
	  			// si la imagen se subio correctamente
	  			if (xhr.status === 200) {
	  				console.log("imagen subida");
	  				resolve( JSON.parse( xhr.response ) );
	  			}else{
	  				console.log("Fallo la subida");
	  				reject(xhr.response);
	  			}
	  		}
	  	}

	  	let  url = URL_SERVICIOS + '/upload/' + tipo + '/' + id;

	  	xhr.open('PUT', url, true);
	  	xhr.send(formData);
  	});
  }

}
