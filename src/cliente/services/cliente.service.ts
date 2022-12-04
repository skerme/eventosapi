


import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cliente } from '../model/cliente.model';

@Injectable()
export class ClienteService {
    constructor(
      @InjectModel('Cliente') private readonly clienteModel: Model<Cliente>,
    ) {}
  
  
    
    async getByEstado(estado: number):Promise<any> {
      return await this.clienteModel.find({estado:estado}).exec();
    }
  
  
  
    async getAll() {
      return await this.clienteModel.find().exec();
    }
  
  




  
    async getAllDespesaTotalPeriodo() {
      console.log("ffffffffffff")
      return await this.clienteModel.aggregate([{       "$group": {"_id": null  ,     "DESPESA":{ "$sum":"$valor" } }     }     ] )
    }
    
  
  
  
    async getById(id: string) {
      return await this.clienteModel.findById(id).exec();
    }
  
  
  
    async getByCpf(cpf: string) {
      return await this.clienteModel.findOne({cpf:cpf, estado:1}).exec();
    }
  
  
  
  
  
  
  
    async create(cliente: Cliente) {
      return await new this.clienteModel(cliente).save();
  
  
      
    }
  
    async update(id: string,  cliente: Cliente): Promise<Cliente> {
      await this. clienteModel.findByIdAndUpdate({ _id: id },  cliente).exec();
      return this.getById(id);
    }
  
  
  
  
  
  
  
    async delete(id: string) {
      await this.clienteModel.deleteOne({ _id: id }).exec();
      return id;
    }
  
  
  }
  