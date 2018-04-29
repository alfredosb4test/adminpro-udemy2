import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';

// Import Modulo
import { SharedModule } from '../shared/shared.module';
import { PAGES_ROUTES } from './pages.routes'
import { GraficaDonaComponent } from '../components/grafica-dona/grafica-dona.component';
import { ModalUploadComponent } from '../components/modal-upload/modal-upload.component'; 
//tmp
import { IncrementadorComponent } from '../components/incrementador/incrementador.component'

// NG2 Charts
import { ChartsModule } from 'ng2-charts';
import { AccoutSettingsComponent } from './accout-settings/accout-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';

// Pipes
import { PipesModule } from '../pipes/pipes.module';
import { ProfileComponent } from './profile/profile.component';

// Mantenimiento
import { UsuariosComponent } from './usuarios/usuarios.component';
import { HospitalesComponent } from './hospitales/hospitales.component';
import { MedicosComponent } from './medicos/medicos.component';
import { MedicoComponent } from './medicos/medico.component';

@NgModule({
	declarations:[
		PagesComponent,
	    DashboardComponent,
	    ProgressComponent,
	    Graficas1Component,
	    IncrementadorComponent,
	    GraficaDonaComponent,
	    AccoutSettingsComponent,
	    PromesasComponent,
	    RxjsComponent,
	    ProfileComponent,
	    UsuariosComponent,
	    ModalUploadComponent,
	    HospitalesComponent,
	    MedicosComponent,
	    MedicoComponent
	    
	],
	exports: [	// exportar los modulos en caso de ocuparse en otros componentes
	    DashboardComponent,
	    ProgressComponent,
	    Graficas1Component
	],
	imports:[
		SharedModule,
		PAGES_ROUTES,
		FormsModule,
		ChartsModule,
		PipesModule,
		CommonModule
	]

})

export class PageModule { }