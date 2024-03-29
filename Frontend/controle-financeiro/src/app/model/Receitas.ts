import { Despesas } from "./Despesas";

export interface Receitas {
  id: number,
  descricao: string,
  valor: number,
  data: string | null,
  despesas?: Array<Despesas>;
}
