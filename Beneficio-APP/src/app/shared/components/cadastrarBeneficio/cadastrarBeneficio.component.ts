import { Component, OnInit } from '@angular/core';
import { Servidor } from '../../models/Servidor';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BeneficioService } from 'src/app/core/services/beneficio.service';
import { OrgaoService } from 'src/app/core/services/orgao.service';
import { SetorService } from 'src/app/core/services/setor.service';
import { Beneficio } from '../../models/Beneficio';
import { Orgao } from '../../models/Orgao';
import { Setor } from '../../models/Setor';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { ptBrLocale } from 'ngx-bootstrap/locale';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { MovimentacaoBeneficio } from '../../models/MovimentacaoBeneficio';
import { MovimentacaoService } from 'src/app/core/services/movimentacao.service';
import { Categoria } from '../../models/Categoria';
import { DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { AnexoBeneficio } from '../../models/AnexoBeneficio';
import { error } from 'protractor';
import { AnexoService } from 'src/app/core/services/anexo.service';
import { ServidorService } from 'src/app/core/services/servidor.service';
defineLocale('pt-br', ptBrLocale);

@Component({
  selector: 'app-cadastrarBeneficio',
  templateUrl: './cadastrarBeneficio.component.html',
  styleUrls: ['./cadastrarBeneficio.component.scss']
})
export class CadastrarBeneficioComponent implements OnInit {

  _filtroConsulta = '';
  _botaoHabilitado = true;
  servidor: Servidor;
  _orgaoId: number = 1;
  setorId: number = 1;
  orgao: Orgao[];
  setor: Setor[];
  beneficio: Beneficio;

  get orgaoId(): number {
    return this._orgaoId;
  }

  set orgaoId(value: number) {
    this._orgaoId = value;
  }

  
  get filtroConsulta(): string {
    return this._filtroConsulta;
  }

  set filtroConsulta(value: string) {
    this._filtroConsulta = value;
  }

  get botaoHabilitado(): boolean {
    return this._botaoHabilitado;
  }

  set botaoHabilitado(value: boolean) {
    this._botaoHabilitado = value;
  }

  constructor(
    private beneficioService: BeneficioService,
    private orgaoService: OrgaoService,
    private setorService: SetorService,
    private servidorService: ServidorService,
    private movimentacaoService: MovimentacaoService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private localeService: BsLocaleService,
    private modalService: BsModalService,
    private sanitizer: DomSanitizer,
    private anexoService: AnexoService
  ) { }

  

  ngOnInit() {
    this.getOrgao();
    this.getSetor();
  }

  getOrgao(){
    this.orgaoService.getAllOrgao().subscribe(
      (_orgao: Orgao[]) => {
        this.orgao = _orgao;
        console.log(this.orgao);
      }, error => {
        console.log(error);
      }
    );
  }

  getSetor(){
    this.setorService.getAllSetor().subscribe(
      (_setor: Setor[]) => {
        this.setor = _setor.filter(s => s.id === 1);
        console.log(this.setor);
      }, error => {
        console.log(error);
      }
    );
  }

  consultaServidor(matricula: string){
    this.servidorService.getCategoriaByMatricula(matricula).subscribe(
      (_servidor: Servidor) => {
        console.log(_servidor);
        this.servidor = _servidor;
      }, error => {
        console.log(error);
      }
    );
  }

  cadastrarBeneficio(){
    // this.beneficio.orgaoId = this.orgaoId;
    // this.beneficio.servidorId = this.servidor.id;
    // this.beneficio.setorId = this.setorId;
    console.log('aqui');
    console.log(this.beneficio);
    this.beneficioService.postAlternativo(this.orgaoId, this.servidor.id, this.setorId).subscribe(
      (_beneficio: Beneficio) => {
        this.botaoHabilitado = false;
        this.beneficio = _beneficio;
        this.toastr.success('Cadastro efetuado com Sucesso');
      }, error => {
        console.log(error);
      }
    );
  }

}
