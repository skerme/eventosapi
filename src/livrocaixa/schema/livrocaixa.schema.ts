import * as mongoose from 'mongoose';
export const LivroCaixaSchema = new mongoose.Schema({

    descricao: {type: String, required: true,},
    valor: {type: Number, required: true,},
    data: {type: Date, required: true,},
    estado: {type: Number,  required: true, default:1},
    perfil: {type: String},
 
});



