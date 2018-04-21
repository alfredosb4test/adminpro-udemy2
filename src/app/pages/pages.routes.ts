import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { AccoutSettingsComponent } from './accout-settings/accout-settings.component';
import { ProfileComponent } from './profile/profile.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { PagesComponent } from './pages.component';
import { LoginGuardGuard } from '../services/service.index';

import { UsuariosComponent } from './usuarios/usuarios.component';


const pagesRoutes: Routes = [
	{ 
			path: '', 
			component: PagesComponent,
			canActivate:[LoginGuardGuard],
			children: [
				{ path: 'dashboard', component: DashboardComponent, data:{titulo:'Dashboard'} },
				{ path: 'progress', component: ProgressComponent, data:{titulo:'Progress Bar'} },
				{ path: 'graficas1', component: Graficas1Component, data:{titulo:'Graficas'} },
				{ path: 'promesas', component: PromesasComponent, data:{titulo:'Promesas'} },
				{ path: 'rxjs', component: RxjsComponent, data:{titulo:'Observables'} },
				{ path: 'accout-settings', component: AccoutSettingsComponent, data:{titulo:'Temas'} },
				{ path: 'perfil', component: ProfileComponent, data:{titulo:'Perfil de Usuario'} },
				
				// Mantenimiento
				{ path: 'usuarios', component: UsuariosComponent, data:{titulo:'Mantenimiento de Usuarios'} },
				{ path: 'usuarios', component: UsuariosComponent, data:{titulo:'Mantenimiento de Usuarios'} },
				{ path: 'usuarios', component: UsuariosComponent, data:{titulo:'Mantenimiento de Usuarios'} },
				{ path: '', redirectTo: '/dashboard', pathMatch: 'full' }
			]
	} 
];

export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);