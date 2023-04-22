import { Despesas } from "./Despesas";

export interface Receitas {
  descricao: string,
  valor: number,
  data: string,
  despesas: Array<Despesas>;
}
