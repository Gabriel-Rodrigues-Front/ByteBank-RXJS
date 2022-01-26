export interface Acoes extends Array<Acao>{

}

export interface Acao {
  Id: Number;
  Codigo: String;
  Descricao: String;
  Preco: number;
}

export interface AcoesAPI {
  payload: Acoes;
}
