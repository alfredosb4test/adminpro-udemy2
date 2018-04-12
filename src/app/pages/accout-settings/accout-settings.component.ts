import { Component, OnInit, Inject } from '@angular/core';

import { SettingsService } from '../../services/service.index';

@Component({
  selector: 'app-accout-settings',
  templateUrl: './accout-settings.component.html',
  styles: []
})
export class AccoutSettingsComponent implements OnInit {

  constructor( public _ajustes: SettingsService ) { 
 
  }

  ngOnInit() {
  	this.colocarCheck();
  }

  cambiarColor(tema:string, link: any){
  	console.log('tema:', tema);

  	this.aplicarCheck(link);

  	this._ajustes.aplicarTema(tema);
  }

  aplicarCheck(link:any){
  	let selectores:any = document.getElementsByClassName('selector');
  	// eliminar la clase working de todos los elementos con la clase selector
  	for( let ref of selectores){
  		ref.classList.remove('working');  		
  	}
  	// agregar la clase working 'palomita' al tema seleccionado
  	link.classList.add('working');
  }

  colocarCheck(){
  	let selectores:any = document.getElementsByClassName('selector');
  	let tema = this._ajustes.ajustes.tema;
  	for( let ref of selectores){
  		 if( ref.getAttribute('data-theme') === tema ){
  		 	ref.classList.add('working')
  		 }
  	}

  }

}
