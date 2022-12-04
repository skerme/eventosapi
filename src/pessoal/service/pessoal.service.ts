/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Pessoal } from '../model/pessoal.model';

@Injectable()
export class PessoalService {
    constructor(
      @InjectModel('Pessoal') private readonly pessoalModel: Model<Pessoal>,
    ) {}
  
  
  
    async getByEstado(estado: number):Promise<any> {
      return await this.pessoalModel.find({estado:estado}).exec();
    }
  
  
  
    async getAll() {
      return await this.pessoalModel.find().exec();
    }
  
  
  
    async getAllDespesaTotalPeriodo() {
      console.log("ffffffffffff")
      return await this.pessoalModel.aggregate([{       "$group": {"_id": null  ,     "DESPESA":{ "$sum":"$valor" } }     }     ] )
    }
    
  
  
  
    async getById(id: string) {
      return await this.pessoalModel.findById(id).exec();
    }
  
  
  
  
  
    async getByEstadoCargo(estado: number, cargo: string):Promise<Pessoal[]> {

     
      return await this.pessoalModel.find( {cargo:cargo, estado:estado}).exec();
    }
  
  
  
  
    async create(pessoal: Pessoal) {
      return await new this.pessoalModel(pessoal).save();
  
  
      
    }
  
    async update(id: string,  pessoal: Pessoal): Promise<Pessoal> {
      await this. pessoalModel.findByIdAndUpdate({ _id: id },  pessoal).exec();
      return this.getById(id);
    }
  
  
  
  
  
  
  
    async delete(id: string) {
      await this.pessoalModel.deleteOne({ _id: id }).exec();
      return id;
    }
  
  


  }
  