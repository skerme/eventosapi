import * as mongoose from 'mongoose';


export const VendaSchema = new mongoose.Schema({
  cliente: { type: String, required: true },

  vendedor: {
    type: String,
    required:true,
  },
  itens: [
    {
      codigo: {
        type: String,
      },
      quantidade: {
        type: Number,
      },
      tamanho: {
        type: String,
      },
      demanda: {
        type: String,
        enum: ['varejo', 'atacado'],
      },
      precoCompra: {
        type: Number,
      },
      descricao: {
        type: String,
      },
      valorUnitario: {
        type: Number,
      },
      subtotal: {
        type: Number,
      }
    },
  ]
  ,

  formaPagamento: {
    type: String,
    required:true,
  },
  
    pix: {
        type: Number,
        default: 0
    },
    dinheiro: {
        type: Number,
        default: 0
    },
    debito: {
        type: Number,
        default: 0
    },
    credito: {
        type: Number,
        default: 0
    },
    





  estado: { type: Number, required: true, default: 1 },
  custoVenda : { type: Number, required: true },
  total: { type: Number, required: true },
  valorRecebido: { type: Number, required: true},
  
  desconto: { type: Number, required: true },
  acrescimo: { type: Number, required: true },
  troco: { type: Number, required: true },
  dataDaVenda: { type: Date, required: true },
  codigo: { type: Number, required: true },
});
