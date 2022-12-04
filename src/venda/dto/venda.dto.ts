import { FormasValores } from "../model/formasValores.model";
import { ItemDto } from "./item.dto";

export class VendaDto {
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
        public pix: number,
        public dinheiro: number,
        public debito: number,
        public credito: number,
    ) {}
  }
  

 