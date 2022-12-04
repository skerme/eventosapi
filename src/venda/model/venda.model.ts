import { FormaDto } from "../dto/forma.dto";
import { ItemDto } from "../dto/item.dto";
import { FormasValores } from "./formasValores.model";

export class Venda {
    constructor(
        public cliente: string,
        public demanda: string,
        public vendedor: string,
        public itens:ItemDto[],
        public formaPagamento: string,
        public total: number,
        public valorRecebido: number,
        public desconto: number,
        public acrescimo: number,
        public troco: number,
        public custoVenda: number,
        public  estado: number,
        public  codigo: number,
        public pix: number,
        public dinheiro: number,
        public debito: number,
        public credito: number,
        public dataDaVenda: Date,

       

    
        
    )  {}
  }
  