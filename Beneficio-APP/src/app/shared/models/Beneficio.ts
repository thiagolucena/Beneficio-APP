import { AnexoBeneficio } from './AnexoBeneficio';
import { MovimentacaoBeneficio } from './MovimentacaoBeneficio';
import { Orgao } from './Orgao';
import { Servidor } from './Servidor';
import { Setor } from './Setor';

export interface Beneficio {

    id: number;
    servidorId: number;
    servidor: Servidor;
    orgaoId: number;
    orgao: Orgao;
    setorId: number;
    setor: Setor;
    dataCadastro: Date;
    lstAnexos: AnexoBeneficio[];
    lstMovimentacoesBeneficio: MovimentacaoBeneficio[]; 
}
