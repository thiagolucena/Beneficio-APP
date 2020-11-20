import { Component, OnInit } from '@angular/core';
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
defineLocale('pt-br', ptBrLocale);

@Component({
  selector: 'app-beneficio',
  templateUrl: './beneficio.component.html',
  styleUrls: ['./beneficio.component.scss']
})
export class BeneficioComponent implements OnInit {
  _filtroConsulta = '';
  dataCadastro: string;
  mostrarCampos = false;
  beneficio: Beneficio;
  movimentacao: MovimentacaoBeneficio;
  setorOrigemId: number;
  setorDestinoId: number;
  orgao: Orgao[];
  setor: Setor[];
  categoria: Categoria[];
  url: string;
  safeUrl: SafeResourceUrl;
  file: File;
  fileNameToUpdate: string;
  anexo: AnexoBeneficio;
  nomeArquivo: string;
  categoriaId: number = 0;

  get filtroConsulta(): string {
    return this._filtroConsulta;
  }

  set filtroConsulta(value: string) {
    this._filtroConsulta = value;
  }

  constructor(
    private beneficioService: BeneficioService,
    private orgaoService: OrgaoService,
    private setorService: SetorService,
    private movimentacaoService: MovimentacaoService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private localeService: BsLocaleService,
    private modalService: BsModalService,
    private sanitizer: DomSanitizer,
    private anexoService: AnexoService
    ) {
      this.localeService.use('pt-br');
     }

  ngOnInit() {
    this.getOrgao();
    this.getSetor();
    this.getCategoria();
  }

  consultaBeneficio(matricula: string){
    this.beneficioService.getBeneficioByMatricula(matricula).subscribe(
      (_beneficio: Beneficio) => {
        this.beneficio = _beneficio;
        this.toastr.success('Consulta efetuada com Sucesso');
        console.log(this.beneficio);
      }, error => {
        console.log(error);
      }
    );
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
        this.setor = _setor;
        console.log(this.setor);
      }, error => {
        console.log(error);
      }
    );
  }

  getCategoria(){
    this.beneficioService.getCategoriaAll().subscribe(
      (_categoria: Categoria[]) => {
        this.categoria = _categoria;
        console.log(this.categoria);
      }, error => {
        console.log(error);
      }
    );
  }

  editarBeneficio(){
    this.mostrarCampos = !this.mostrarCampos;
  }

  salvarAlteracao(){
    this.beneficioService.update(this.beneficio).subscribe(
      (_beneficio: Beneficio) => {
        this.beneficio = _beneficio;
        this.toastr.success('Alteração efetuada com Sucesso');
        console.log(this.beneficio);
        this.mostrarCampos = false;
        this.consultaBeneficio(_beneficio.servidor.matricula);
      }, error => {
        console.log(error);
      }
    );
  }

  openModalDelete(confirm: any){
    confirm.show();
  }

  confirmeDelete(confirm: any){
    this.beneficioService.delete(this.beneficio.id).subscribe(
      () => {
        confirm.hide();
        this.toastr.success('Delete efetuado com Sucesso');
        location.reload();
      }, error => {
        console.log(error);
      }
    );
  }

  salvaMovimentacao(template: any){
    console.log(this.beneficio);
    console.log(this.movimentacao);
    this.movimentacaoService.post(this.beneficio.id, this.beneficio.setorId, this.setorDestinoId).subscribe(
      (_movimentacao: MovimentacaoBeneficio) => {
        template.hide();
        this.toastr.success('Tramitação efetuada');
        this.beneficio.setorId = _movimentacao.setorDestinoId;
        this.salvarAlteracao();
      }, error => {
        console.log(error);
      }
    );
  }

  openModal(template: any){
    template.show();
  }

  visualizarAnexo(modal: any, urlAnexo){
    modal.show();
    console.log(urlAnexo);
    this.url = ('https://localhost:44345/Resources/PDF/' + urlAnexo);
    this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
    console.log(this.safeUrl);
    console.log(this.url);

  }
  upload() {
    console.log(this.file[0].name);
    this.nomeArquivo  = this.file[0].name.replace(' ', '').replace('/', '').replace('-', '');

    this.anexoService.postUpload(this.file, this.nomeArquivo)
      .subscribe(
        () => {
          this.anexoService.postAnexo(this.beneficio.id, this.nomeArquivo, this.categoriaId).subscribe(
            () => {
              this.consultaBeneficio(this.beneficio.servidor.matricula);
            }, error => {
              console.log(error);
            }
          );
        }, error => {
          console.log(error);
        }
      );
  }

  onFileChange(event) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      this.file = event.target.files;
      console.log(this.file);
    }
  }

}
