import { Component, OnInit } from '@angular/core';
import { MedicoService } from '../../services/service.index';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';
import { Medico } from '../../models/medico.model';
import swal from 'sweetalert2';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: []
})
export class MedicosComponent implements OnInit {

	medicos: Medico[] = [];
	desde: number = 0;
	totalRegistros:number = 0;
	cargando: boolean = true;

	constructor(public _medicoService: MedicoService,
				public _modalUploadService: ModalUploadService  ) { }

  ngOnInit() {
  	this.cargarMedicos();
  }

	cargarMedicos(){
		this.cargando = true;
		this._medicoService.cargarMedicos( this.desde )
			.subscribe( (resp:any) =>{
				console.log("cargarMedicos(): ",resp)
				this.totalRegistros = resp.total;
				this.medicos = resp.medicos;
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
		this.cargarMedicos();
		console.log("valor: ",this.desde)

	}	

	buscarMedico( termino: string ){
		if(termino.length <= 0) {
			this.cargarMedicos();
			return;
		}
		this.cargando = true;
		this._medicoService.buscarMedicos(termino)
				.subscribe( (hospitales:Medico[])=>{
					console.log(hospitales)
					this.medicos = hospitales;
					this.cargando = false;
				})
	}

	borrarMedico(medico: Medico){
		this._medicoService.borrarMedico(medico._id)
			.subscribe();
	}

	crearMedico(){
		swal({
		  title: 'Crear Medico',
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

	        this._medicoService.crearMedico(result.value)
	        	.subscribe(resp => {
				    swal({
				      type: 'success',
				      title: 'Hospital creado!',
				      html: 'hospital: ' + result.value
				    });
				    this.cargarMedicos();	        		
	        	})			  	

		  }
		})
	}	

}
