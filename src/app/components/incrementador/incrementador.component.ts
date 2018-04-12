import { Component, OnInit, Input, Output, ViewChild, ElementRef, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: []
})
export class IncrementadorComponent implements OnInit {

	@ViewChild('txtProgress') txtProgress: ElementRef;

	@Input('nombre')	leyenda: string = "Leyenda";
	@Input()	progreso: number = 90;

	@Output('actualizaValor') cambioValor: EventEmitter<number> = new EventEmitter();


  constructor() {

  }

  ngOnInit(){
  		console.log("leyenda: ", this.leyenda)
  		console.log("progreso: ", this.progreso)
  }

  onChanges(newValue:number){
  	console.log(newValue);

  	//let elemHTML:any = document.getElementsByName('progreso')[0];

  	if (newValue >= 100){ 
  		this.progreso = 100;
  	}
  	else if(newValue <= 0){
  		this.progreso=0;
  	}
  	else{
  		this.progreso = newValue;
  	}

  	
  	//elemHTML.value = this.progreso;
  	
  	// Agregar el nuevo valor al INPUT con la referencia 'txtProgress'
  	this.txtProgress.nativeElement.value = this.progreso;

  	this.cambioValor.emit( this.progreso );


  }

  cambiarValor( valor ){
  	if(this.progreso == 100 && valor == +5){
  		return;
  	}
  	if(this.progreso == 0 && valor == -5){
  		return;
  	}

  	this.progreso = this.progreso + valor;

  	this.cambioValor.emit( this.progreso );

  	this.txtProgress.nativeElement.focus();
  }

}
