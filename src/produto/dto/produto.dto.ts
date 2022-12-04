import { Tamanho } from 'src/produto/model/tamanhoProduto.model';

export class ProdutoDto {
  constructor(
    public codigo: number,
    public descricao: string,
    public precoCompra: number,
    public precoVendaVarejo: number,
    public precoVendaAtacado: number,
    public dataCriacao: Date,
    public dataAlteracao: Date,
    public estado: number,
    public tamanhos: Tamanho[],
    
  ) {}
}



export class HistoricoProduto {
  constructor(
    public codigo: number,
    public descricao: string,
    public precoCompra: number,
    public precoVendaVarejo: number,
    public precoVendaAtacado: number,
    public dataCriacao: Date,
    public dataAlteracao: Date,
    public estado: number,
    public tamanhos: Tamanho[],
    public  quantAjustada: Number,
    
  ) {}
}
