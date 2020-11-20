import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BeneficioComponent } from './shared/components/beneficio/beneficio.component';
import { CadastrarBeneficioComponent } from './shared/components/cadastrarBeneficio/cadastrarBeneficio.component';
import { DashboardComponent } from './shared/components/dashboard/dashboard.component';

const routes: Routes = [
  { path: 'beneficio', component: BeneficioComponent},
  { path: 'cadbeneficio', component: CadastrarBeneficioComponent},
  { path: 'dashboard', component: DashboardComponent },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: 'dashboard', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
