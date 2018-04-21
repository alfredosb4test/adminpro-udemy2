import { Injectable, EventEmitter } from '@angular/core';
 

@Injectable()
export class ModalUploadService {
	public tipo: string;
	public id:string;
	public oculto: string = 'oculto';

	// notificar del modal a otras pantallas que ya se subio la imagen
	public notificacion = new EventEmitter<any>();


  constructor() { 
  	console.log("Service ModalUpload Listo")
  }

  ocultarModal(){
  	this.oculto = 'oculto';
  	this.tipo = null;
  	this.id = null;


  }

  mostrarModal(tipo: string, id: string){
  	console.log("ModalUploadService.mostrarModal: ", tipo + " | id:", id)
  	this.oculto = '';
  	this.tipo = tipo;
  	this.id = id;
  }

}
