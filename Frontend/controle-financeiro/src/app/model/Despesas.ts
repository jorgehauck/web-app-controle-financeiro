import { Categoria } from "../enums/Categoria.enum";
import { Receitas } from "./Receitas";

export interface Despesas {
  id: number,
  descricao: string,
  valor: number,
  data: Date,
  receitas: Receitas,
  categoria: Categoria;
}
