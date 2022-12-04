import * as mongoose from 'mongoose';
export const PessoalSchema = new mongoose.Schema({

    nome: {type: String, required: true,},
    cpf: {type: String, required: true,},
    // pis: {type: String, required: true,},
    // ctps: {type: String, required: true,},



    // vinculo: {type: String, required: true,},
    // situacao: {type: String, required: true,},
    cargo: {type: String, required: true,},
    // dependentes: {type: Number, required: true,},


    email: {type: String},
    dataNascimento: {type: String},
    dataAdmissao: {type: String},
    salarioBase: {type: Number},



    bairro: {type: String},
    cep: {type: String},
    complemento: {type: String},
    logradouro: {type: String},
    numero: {type: String},
    pontoReferencia: {type: String},
    telefone: {type: String},
    estado: {type: Number, required: true, default:1},
    
 
});


