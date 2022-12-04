
import { ItemDto } from "../dto/item.dto";



export class Compra {
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
        public  codigo: number,
        public pix: number,
        public dinheiro: number,
        public debito: number,
        public credito: number,
        public dataDaCompra: Date,

       

    
        
    )  {}
  }
  