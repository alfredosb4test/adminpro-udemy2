import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { Title, Meta, MetaDefinition } from '@angular/platform-browser';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: []
})
export class BreadcrumbsComponent implements OnInit {
  titulo: string = "pagina";
  constructor( private router: Router, 
  			   public title: Title,
  			   public meta: Meta) { 

	this.getDataRoute().subscribe( data =>{
		console.log(data);
		this.titulo = data.titulo;
		this.title.setTitle(this.titulo);

		let metaTag: MetaDefinition = {
			name: 'Descripcion',
			content: this.titulo

		}
		this.meta.updateTag(metaTag)
	})
  }

  ngOnInit() {
  }

  getDataRoute(){
  	return this.router.events
  		.filter( evento => evento instanceof ActivationEnd )
  		.filter( (evento:ActivationEnd) => evento.snapshot.firstChild === null )
  		.map( (evento:ActivationEnd) => evento.snapshot.data );
  }

}
