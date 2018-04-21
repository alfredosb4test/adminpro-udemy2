import { Component, OnInit } from '@angular/core';
import { SubirArchivoService } from '../../services/service.index';
import { ModalUploadService } from '../modal-upload/modal-upload.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: []
})
export class ModalUploadComponent implements OnInit {

	imagenSubir: File;
	imagenTemp: string;

  constructor( public _subirArchivoService: SubirArchivoService, 
  			   public _modalUploadService: ModalUploadService ) { 
  	console.log("Componente Modal Listo");
  }

  ngOnInit() {
  }

  cerrarModal(){
  	this.imagenTemp = null;
  	this.imagenSubir = null;
  	this._modalUploadService.ocultarModal();
  }

  seleccionImage( archivo: File ){
    if ( !archivo ) {
      this.imagenSubir = null;
      return;
    }

    if (archivo.type.indexOf('image') < 0) {
      swal('Error de imagen', 'Debe seleccionar solo imagenes.', 'error');
      this.imagenSubir = null;
      return;      
    }

    this.imagenSubir = archivo;

    let reader = new FileReader();
    let urlImagenTemp = reader.readAsDataURL( archivo );

    reader.onloadend = () => this.imagenTemp = reader.result;

    console.log("seleccionImage: ",archivo)
  }

  subirImagen(){
  	this._subirArchivoService.subirArchivo( this.imagenSubir, this._modalUploadService.tipo, this._modalUploadService.id )
  		.then( resp =>{
  			console.log("modal-upload.component: ", resp)
  			this._modalUploadService.notificacion.emit( resp );
  			this.cerrarModal();
  		}).catch(err =>{
  			console.log("Error en la carga")
  		})
  }

}
