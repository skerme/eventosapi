import * as mongoose from 'mongoose';




//tempo.setHours(20)


export const ProdutoSchema = new mongoose.Schema({
    codigo: {type: Number, required: true,},
    descricao: {type: String, required: true,},
    precoCompra: {type: Number, required: true,},
    precoVendaVarejo: {type: Number, required: true,},
    precoVendaAtacado: {type: Number, required: true,},
    dataCriacao: {type: Date, required: true},
    dataAlteracao: {type: Date, required: true},
    estado: {type: Number, required: true, default:1},
    tamanhos:[{tamanho:{type: String, required: true,},quantidade:{type: Number, required: true,}}],
  
});



export const HistoricoProdutoSchema = new mongoose.Schema({
    codigo: {type: Number, required: true,},
    descricao: {type: String, required: true,},
    precoCompra: {type: Number, required: true,},
    precoVendaVarejo: {type: Number, required: true,},
    precoVendaAtacado: {type: Number, required: true,},
    dataCriacao: {type: Date, required: true},
    dataAlteracao: {type: Date, required: true},
    estado: {type: Number, required: true, default:1},
    tamanhos:[{tamanho:{type: String, required: true,},quantidade:{type: Number, required: true,}}],
    quantAjustada: {type: Number, required: true, default:0},
  
});


 
