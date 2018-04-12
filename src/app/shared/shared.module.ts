import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';

import { RouterModule} from '@angular/router';

import { BreadcrumbsComponent } from '../shared/breadcrumbs/breadcrumbs.component';
import { HeaderComponent } from '../shared/header/header.component';
import { SidebarComponent } from '../shared/sidebar/sidebar.component';
import { NopagefoundComponent } from '../shared/nopagefound/nopagefound.component';

// Pipes
import { PipesModule } from '../pipes/pipes.module';

@NgModule({
	imports:[
		RouterModule,
		CommonModule,
		PipesModule
	],
	declarations:[
	    NopagefoundComponent,	    
	    HeaderComponent,
	    SidebarComponent,
		BreadcrumbsComponent,
		NopagefoundComponent
	],
	exports: [	// exportar los modulos en caso de ocuparse en otros componentes
		BreadcrumbsComponent,
	    HeaderComponent,
	    SidebarComponent,
	    NopagefoundComponent
	]
})

export class SharedModule { }