import * as mongoose from 'mongoose';


export const CompraSchema = new mongoose.Schema({
  // cliente: { type: String, required: true },

  // vendedor: {
  //   type: String,
  //   required:true,
  // },
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
      descricao: {
        type: String,
      }
    },
  ]
  ,

  // formaPagamento: {
  //   type: String,
  //   required:true,
  // },
  
    // pix: {
    //     type: Number,
    //     default: 0
    // },
    // dinheiro: {
    //     type: Number,
    //     default: 0
    // },
    // debito: {
    //     type: Number,
    //     default: 0
    // },
    // credito: {
    //     type: Number,
    //     default: 0
    // },
    





  estado: { type: Number, required: true, default: 1 },
  // custoVenda : { type: Number, required: true },
  total: { type: Number, required: true },
  // valorRecebido: { type: Number, required: true},
  
  custoDosItens: { type: Number, required: true },
  frete: { type: Number, required: true },
  tributo: { type: Number, required: true },
  outros: { type: Number, required: true },
  // troco: { type: Number, required: true },
  dataDaCompra: { type: Date, required: true },
  codigo: { type: Number, required: true },
});
