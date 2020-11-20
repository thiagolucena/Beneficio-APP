import { Beneficio } from './Beneficio';
import { Setor } from './Setor';

export interface MovimentacaoBeneficio {
    id: number;
    beneficioId: number;
    beneficio: Beneficio;
    dataTramitacao: Date;
    setorOrigemId: number;
    setorOrigem: Setor;
    setorDestinoId: number;
    setorDestino: Setor;

}
