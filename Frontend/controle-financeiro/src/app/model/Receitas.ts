import { Despesas } from "./Despesas";

export interface Receitas {
  descricao: string,
  valor: number,
  data: Date,
  despesas: Array<Despesas>;
}
