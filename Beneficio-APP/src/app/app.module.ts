import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BeneficioComponent } from './shared/components/beneficio/beneficio.component';
import { DateTimeFormatPipePipe } from './shared/utils/pipes/DateTimeFormatPipe.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BeneficioService } from './core/services/beneficio.service';
import { NavComponent } from './shared/components/nav/nav.component';
import { ToastrModule } from 'ngx-toastr';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { MovimentacaoService } from './core/services/movimentacao.service';
import { OrgaoService } from './core/services/orgao.service';
import { SetorService } from './core/services/setor.service';
import { AnexoService } from './core/services/anexo.service';
import { DashboardComponent } from './shared/components/dashboard/dashboard.component';
import { CadastrarBeneficioComponent } from './shared/components/cadastrarBeneficio/cadastrarBeneficio.component';
import { ServidorService } from './core/services/servidor.service';

@NgModule({
  declarations: [
    AppComponent,
    BeneficioComponent,
    DateTimeFormatPipePipe,
    NavComponent,
    DashboardComponent,
    CadastrarBeneficioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    BsDatepickerModule.forRoot(),
    ModalModule.forRoot(),
    TabsModule.forRoot(),
    ToastrModule.forRoot({
      timeOut: 3000,
      preventDuplicates: true,
      progressBar: true
    })
  ],
  providers: [
    BeneficioService, MovimentacaoService, OrgaoService, SetorService, AnexoService, ServidorService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
