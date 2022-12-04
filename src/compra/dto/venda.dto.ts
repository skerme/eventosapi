import { ItemDto } from "./item.dto";

export class CompraDto {
    constructor(
        public cliente: string,
        public demanda: string,
        public vendedor: string,
        public itens:ItemDto[],
        public formaPagamento: string,
        public total: number,
        public valorRecebido: number,
        public frete: number,
        public tributo: number,
        public outros: number,
        public custoDosItens: number,
        
        public troco: number,
        public custoVenda: number,
        public  estado: number,
        public pix: number,
        public dinheiro: number,
        public debito: number,
        public credito: number,
    ) {}
  }
  

 