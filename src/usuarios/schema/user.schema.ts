import * as mongoose from 'mongoose';

var tempo=new Date()

//tempo.setHours(20)

export const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  perfil: String,
  password: String,
 
  estado: {type: Number, required: true, default:1},
  dataDaCriacao: { type: Date, required: true, default: tempo }
});
