import * as mongoose from 'mongoose';
export const EstatisticaSchema = new mongoose.Schema({

    descricao: {type: String, required: true,},
    valor: {type: Number, required: true,},
    data: {type: Date, required: true,},
    estado: {type: Number,  required: true, default:1},
    perfil: {type: String},
    pc: {type: Number, required: true,},
    pvv: {type: Number, required: true,},
    pva: {type: Number, required: true,},
    qdtItens: {type: Number, required: true,},


});
