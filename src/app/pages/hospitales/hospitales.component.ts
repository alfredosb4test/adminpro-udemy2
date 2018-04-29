import { Component, OnInit } from '@angular/core';
import { HospitalService } from '../../services/service.index';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';
import { Hospital } from '../../models/hospital.model';
import swal from 'sweetalert2';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: []
})
export class HospitalesComponent implements OnInit {

	hospitales: Hospital[] = [];
	desde: number = 0;
	totalRegistros:number = 0;
	cargando: boolean = true;
	constructor(public _hospitalService: HospitalService,
				public _modalUploadService: ModalUploadService ) { }

	ngOnInit() {
		this.cargarHospitales();
		// se subscribe a notificacion en espera de un cambio en la imagen
		this._modalUploadService.notificacion.subscribe( resp => this.cargarHospitales() );
	}

	mostrarModal( id:string ){
		this._modalUploadService.mostrarModal('hospitales', id);
	}

	cargarHospitales(){
		this.cargando = true;
		this._hospitalService.cargarHospitales( this.desde )
			.subscribe( (resp:any) =>{
				console.log(resp)
				this.totalRegistros = resp.total;
				this.hospitales = resp.hospitales;
				this.cargando = false;
			})
	}

	cambiarDesde(valor:number){
		let desde = this.desde + valor;
 
		if(desde >= this.totalRegistros){
			return;
		}
		if(desde < 0){
			return;
		}

		this.desde += valor;
		this.cargarHospitales();
		console.log("valor: ",this.desde)

	}

	guardarHospital(hospital){
		this._hospitalService.actualizarHospital( hospital )
			.subscribe();
	}

	buscarHospital(termino: string){
		if(termino.length <= 0) {
			this.cargarHospitales();
			return;
		}
		this.cargando = true;
		this._hospitalService.buscarHospitales(termino)
				.subscribe( (hospitales:Hospital[])=>{
					console.log(hospitales)
					this.hospitales = hospitales;
					this.cargando = false;
				})
	}

	nuevoHospital(){
		swal({
		  title: 'Crear Hospital',
		  input: 'text',
		  showCancelButton: true,
		  confirmButtonText: 'Crear',
		  showLoaderOnConfirm: true,
		  preConfirm: (email) => {
		  	return new Promise((resolve) => {
		  		resolve()
		  	})
		  },	
		  allowOutsideClick: () => !swal.isLoading()
		}).then((result) => {
		  if (result.value) {

	        this._hospitalService.crearHospital(result.value)
	        	.subscribe(resp => {
				    swal({
				      type: 'success',
				      title: 'Hospital creado!',
				      html: 'hospital: ' + result.value
				    });
				    this.cargarHospitales();	        		
	        	})			  	

		  }
		})
	}

	borrarHospital(hospital: Hospital){
		swal({
			title: 'Estas seguro?',
			text: 'Esta apunto de borrar a:' + hospital.nombre,
			type: 'warning',
			showCancelButton: true,
			cancelButtonText: 'Cancelar',
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Si, borrar!'
		}).then( (borrar) =>{
			console.log("borrar:", borrar)
			if( borrar.value ){
				this._hospitalService.borrarHospital( hospital )
					.subscribe( borrado => {
						console.log("totalRegistros: ", this.totalRegistros)
						this.cargarHospitales();
					})
			}
		})

 
	}	



}
