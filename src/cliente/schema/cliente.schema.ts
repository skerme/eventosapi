import * as mongoose from 'mongoose';
export const ClienteSchema = new mongoose.Schema({

    nome: {type: String, required: true,},
    cpf: {type: String},
    cnpj: {type: String},
    email: {type: String},
    bairro: {type: String},
    cep: {type: String},
    complemento: {type: String},
    logradouro: {type: String},
    numero: {type: String},
    pontoReferencia: {type: String},
    telefone: {type: String},
    estado: {type: Number, required: true, default:1},


    
    
 
});


