import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Medico } from '../../models/medico.model';
import { MedicoService } from '../../services/service.index';
import { Hospital } from '../../models/hospital.model';
import { HospitalService } from '../../services/service.index';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: []
})
export class MedicoComponent implements OnInit {

	hospitales: Hospital[] = [];
	medico: Medico = new Medico('','','','','');
	hospital: Hospital = new Hospital('');

  constructor( public _medicoService:MedicoService,
  			   public _hospitalService:HospitalService,
  			   public router: Router,
  			   public activatedRoute: ActivatedRoute,
           public _modalUploadService: ModalUploadService ) { 
  		activatedRoute.params.subscribe( params => {
  			let id = params['id'];

  			if( id !== 'nuevo' ){
  				this.cargarMedico( id );
  			}
  		})
	}

  ngOnInit() {
  	this._hospitalService.cargarHospitales_sinpaginar()
  		.subscribe( (hospitales: any) => {
  			console.log("cargarHospitales_sinpaginar: ",hospitales)
  			this.hospitales = hospitales.hospitales
  		})

    this._modalUploadService.notificacion
      .subscribe( resp =>{ 
        this.medico.img = resp.medico.img;
      });  
  }

  guardarMedico( f:NgForm ){
  	console.log("valid:", f.valid);
  	console.log("value:", f.value);

  	if( f.invalid ){
  		return;
  	}

  	this._medicoService.guardarMedico( this.medico )
  		.subscribe( medico =>{
  			console.log("medico:", medico);
  			this.medico._id = medico._id;
  			this.router.navigate(['/medico', medico._id]);
  			this.cambioHospital( this.medico.hospital );
  		})

  }

	cargarMedico( id: string ){

		this._medicoService.cargarMedico( id )
			.subscribe( (medico:any) =>{
				
				this.medico = medico;
        this.medico.hospital = medico.hospital._id;
        this.cambioHospital( this.medico.hospital );
        //this.hospital = medico.hospital;
				console.log("----------------------------")

				//console.log("MedicoComponent.cargarMedico() this.medico : ", this.medico)

			})
	} 

  cambioHospital( id: string ){

  	this._hospitalService.obtenerHospital( id )
  		.subscribe( hospital => this.hospital = hospital );

  }

  cambiarFoto(){
    this._modalUploadService.mostrarModal('medicos', this.medico._id);
  }

}
