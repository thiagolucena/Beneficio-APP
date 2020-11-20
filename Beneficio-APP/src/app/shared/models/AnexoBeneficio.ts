import { Beneficio } from './Beneficio';
import { Categoria } from './Categoria';

export interface AnexoBeneficio {

    id: number;
    beneficioId: number;
    beneficio: Beneficio;
    urlAnexo: string;
    categoriaId: number;
    categoria: Categoria;
}
