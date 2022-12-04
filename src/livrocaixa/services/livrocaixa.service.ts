import { LivroCaixa } from './../model/livrocaixa.model';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';


@Injectable()
export class LivrocaixaService {
  constructor(
    @InjectModel('LivroCaixa') private readonly livroCaixaModel: Model<LivroCaixa>,
  ) {}



  async getByEstado(inicio=new Date() ,  fim=new Date(), perfil='caixa'):Promise<any> {

    var intervalo_inicio=new Date(inicio)
    var intervalo_fim=new Date(fim)

   console.log("eeeeeee333333333",intervalo_inicio, intervalo_fim)


    intervalo_inicio.setHours(0)
    intervalo_inicio.setMinutes(0)
    intervalo_inicio.setSeconds(0)
    intervalo_inicio.setMilliseconds(0)

    intervalo_fim.setHours(+24)
    intervalo_fim.setMinutes(0)
    intervalo_fim.setSeconds(0)
    intervalo_fim.setMilliseconds(0)






    var aux_perfil1='caixa'
    var aux_perfil2='caixa'

if(perfil=='administrador'){
aux_perfil1='caixa'
aux_perfil2='administrador'
} 
console.log("YYYYYYYYYYYYYY",aux_perfil1, aux_perfil2 , perfil, intervalo_inicio, intervalo_fim) 




    return await this.livroCaixaModel.find(   {"$and": [   {"$or":[{"perfil":aux_perfil1},{"perfil":aux_perfil2}]  } ,{descricao:{$ne:"ABERTURA DE CAIXA"}}          , {estado:1}  , {data:{$gte: intervalo_inicio, $lt: intervalo_fim }}  ] }      ).sort({data:-1}) .exec();
  }


  async getByEstadoaberturacaixa(inicio=new Date() ,  fim=new Date(),  perfil='caixa'   ):Promise<LivroCaixa[]> {

    var intervalo_inicio=new Date(inicio)
    var intervalo_fim=new Date(fim)

   console.log("eeeeeee333333333",intervalo_inicio, intervalo_fim)


    intervalo_inicio.setHours(-4)
    intervalo_inicio.setMinutes(0)
    intervalo_inicio.setSeconds(0)
    intervalo_inicio.setMilliseconds(0)

    intervalo_fim.setHours(+20)
    intervalo_fim.setMinutes(0)
    intervalo_fim.setSeconds(0)
    intervalo_fim.setMilliseconds(0)



    var aux_perfil1='caixa'
    var aux_perfil2='caixa'

if(perfil=='administrador'){
aux_perfil1='caixa'
aux_perfil2='administrador'
} 

console.log("YYYYYYYYYYYYYY444444444444444",aux_perfil1, aux_perfil2 , perfil) 

    return await this.livroCaixaModel.find( {"$and": [   {"$or":[{"perfil":aux_perfil1},{"perfil":aux_perfil2}]  } , {descricao:"ABERTURA DE CAIXA"},  {data:{$gte: intervalo_inicio, $lt: intervalo_fim }}  ] }   ).exec();
  }









  async getAll() {
    return await this.livroCaixaModel.find().exec();
  }



  async getAllDespesaTotalPeriodo(inicio=new Date() ,  fim=new Date()) {

    var intervalo_inicio=new Date(inicio)
    var intervalo_fim=new Date(fim)
    intervalo_inicio.setHours(0)
    intervalo_inicio.setMinutes(0)
    intervalo_inicio.setSeconds(0)
    intervalo_inicio.setMilliseconds(0)

    intervalo_fim.setHours(+24)
    intervalo_fim.setMinutes(0)
    intervalo_fim.setSeconds(0)
    intervalo_fim.setMilliseconds(0)

    

    
    console.log("inicioooooooo", intervalo_inicio, intervalo_fim)

  var  res=await this.livroCaixaModel.aggregate([{$match: { data:{   $gte: intervalo_inicio,$lt: intervalo_fim } , estado:{$eq:1}, descricao:{$ne:"ABERTURA DE CAIXA"} }   },   {       "$group": {"_id": null  ,     "DESPESA":{ "$sum":"$valor" } }     }     ] )
  var res2: number=0  


if(res.length==0){
  res2=0
}else{
  res2=res[0].DESPESA
}


console.log("uuuuuuuuuuuuuuuuuuuuUUUUUUUUUUU", res, res2)


    return  res2
  }
  



  async getById(id: string) {
    return await this.livroCaixaModel.findById(id).exec();
  }







  async create(livrocaixa: LivroCaixa) {
    return await new this.livroCaixaModel(livrocaixa).save();


    
  }



  async createaberturaCaixa(livrocaixa: LivroCaixa) {
    return await new this.livroCaixaModel(livrocaixa).save();


    
  }



  async createdespesaCaixa(livrocaixa: LivroCaixa) {
    return await new this.livroCaixaModel(livrocaixa).save();
 
  }


  async update(id: string,  livroCaixa: LivroCaixa): Promise<LivroCaixa> {
    await this. livroCaixaModel.findByIdAndUpdate({ _id: id },  livroCaixa).exec();
    return this.getById(id);
  }







  async delete(id: string) {
    await this.livroCaixaModel.deleteOne({ _id: id }).exec();
    return id;
  }


}
