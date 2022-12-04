import { ConsoleLogger, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ApiGatewayTimeoutResponse } from '@nestjs/swagger';
import { Model } from 'mongoose';
import { measureMemory } from 'vm';
import { Venda } from '../model/venda.model';

@Injectable()
export class VendaService {
  constructor(
    @InjectModel('Venda') private readonly vendaModel: Model<Venda>,
  ) {}



  async getquantidadeItensVendidos( inicio=new Date() ,  fim=new Date()   ) {

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



    var resultado=await this.vendaModel.aggregate(  [{$match: { dataDaVenda:{   $gte: intervalo_inicio,$lt: intervalo_fim } , estado:{$eq:1}}   },{ $project: {quantidadeporvenda: { $sum:"$itens.quantidade"}   }  }]  )
    var total=0
    for(var i=0; i<resultado.length;i++){

  //    console.log("ZZZZZZZZZZZZZZZZZZZZ",resultado[i] )
         total+=resultado[i].quantidadeporvenda

    }

   // console.log("forma", "inicioggggggggg",intervalo_inicio, "fim",intervalo_fim, resultado)


   return total
     
  //  return await this.vendaModel.aggregate([    {$match: { dataDaVenda:{   $gte: intervalo_inicio,$lt: intervalo_fim } , estado:{$eq:1}}   }, { "$group": {        "_id": {"forma":"$formaPagamento"}  ,     "count":{ "$sum":"$total" } }     }                 ] ).sort({count:-1})
  }



  async getAllFormaPagamento( inicio=new Date() ,  fim=new Date()   ) {

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



   // intervalo_fim.setDate(intervalo_fim.getDay() )


  //  console.log("forma", "inicioggggggggg",intervalo_inicio, "fim",intervalo_fim)


   return await this.vendaModel.aggregate([    {$match: { dataDaVenda:{   $gte: intervalo_inicio,$lt: intervalo_fim } , estado:{$eq:1}}   }, { "$group": {        "_id": null ,     "pix":{ "$sum":"$pix" } ,"dinheiro":{ "$sum":"$dinheiro" },"debito":{ "$sum":"$debito" },"credito":{ "$sum":"$credito" } },     }                 ] ).sort({count:-1})
     
  //  return await this.vendaModel.aggregate([    {$match: { dataDaVenda:{   $gte: intervalo_inicio,$lt: intervalo_fim } , estado:{$eq:1}}   }, { "$group": {        "_id": {"forma":"$formaPagamento"}  ,     "count":{ "$sum":"$total" } }     }                 ] ).sort({count:-1})
  }








  async getAllValorTotalDaVenda(inicio=new Date() ,  fim=new Date() ) {

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


    console.log(" uUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUU",intervalo_inicio,  intervalo_fim)



    return await this.vendaModel.aggregate([{$match: { dataDaVenda:{   $gte: intervalo_inicio,$lt: intervalo_fim } , estado:{$eq:1}}   },{       "$group": {"_id": null  ,     "RCB":{ "$sum":"$total" } }     }     ] )
  }






  async getAllValorDesconto(inicio=new Date() ,  fim=new Date()) {

    
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



    return await this.vendaModel.aggregate([{$match: { dataDaVenda:{   $gte: intervalo_inicio,$lt: intervalo_fim } , estado:{$eq:1}}   },{       "$group": {"_id": null  ,     "DESCONTO":{ "$sum":"$desconto" } }     }     ] )
  }
 



 


  async getAllValorPrecoCompra(inicio=new Date() ,  fim=new Date()) {

    
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




   console.log("ffffffffffffPRECOCOMPRAAAAAAAAAAAAAAAAAAAXXXXXXXXXXXXXXXXXXXXX",intervalo_inicio,"FF",intervalo_fim)



    return await this.vendaModel.aggregate([{$match: { dataDaVenda:{   $gte: intervalo_inicio,$lt: intervalo_fim } , estado:{$eq:1}}   },{       "$group": {"_id": null   ,     "CMV":{ "$sum":"$custoVenda" } }     }     ] )
  }










  
  async getAllVendedor(  inicio=new Date() ,  fim=new Date()    ) {

    console.log("eeeeeee1111",inicio, fim)

     var intervalo_inicio=new Date(inicio)
     var intervalo_fim=new Date(fim)

  ///  console.log("eeeeeee333333333",intervalo_inicio, intervalo_fim)


     intervalo_inicio.setHours(0)
     intervalo_inicio.setMinutes(0)
     intervalo_inicio.setSeconds(0)
     intervalo_inicio.setMilliseconds(0)

     intervalo_fim.setHours(+24)
     intervalo_fim.setMinutes(0)
     intervalo_fim.setSeconds(0)
     intervalo_fim.setMilliseconds(0)


    console.log("eeeeeeeeeeeeeee444444444444", intervalo_inicio, intervalo_fim)




    return await this.vendaModel.aggregate([  {$match:  { dataDaVenda:{   $gte: intervalo_inicio,$lt: intervalo_fim } , estado:{$eq:1}} },                      { "$group": {        "_id": {"vendedor":"$vendedor"}  ,     "count":{ "$sum":"$total" } }     }     ]).sort({count:-1})
  }
  

  


  async getQuantidadeVendidaCodigoTamanho(codigo: number, tamanho: string) {
    console.log("ffffffffffff")
    return await this.vendaModel.find( {itens: {$elemMatch: { "codigo": { "$eq":codigo},            "tamanho":{ "$eq":tamanho }}}  }, {"itens.quantidade":1, "_id":0}              )
  }
  
  


  async getByEstado(inicio=new Date() ,  fim=new Date()   ):Promise<Venda[]> {

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


    console.log("eeeeeee3çççççççççççççççççççççççç",intervalo_inicio, intervalo_fim)


    return await this.vendaModel.find( {"$and": [  {estado:1},  {dataDaVenda:{$gte: intervalo_inicio, $lt: intervalo_fim }}  ] }   ).sort({codigo:-1}).limit(100);
  }






  async getAll() {
    return await this.vendaModel.find();
  }

  

  async create(venda: Venda) {
    return await new this.vendaModel(venda).save();
  }






  async getMaiorCodigo(): Promise<number>{

    var  resultado= await this.vendaModel.find().sort( {"codigo" : -1 } ).limit(1) 
   var resposta: number=0

console.log("resultado",resultado )

    if(resultado.length==0){
      resposta=0
      console.log("resultado2222",resultado )
    }else{

      resposta=resultado[0].codigo
    }
    console.log("resultadoerer",resposta)


    return resposta
  }








  async update(id: string, venda: Venda): Promise<any> {
    return await this.vendaModel.updateOne({ _id: id }, venda).exec();
   
  }





  async obterQuantidadeVendidaItensAtacadoVarejo(inicio=new Date() ,  fim=new Date()): Promise<any>{

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



  //  return await this.vendaModel.aggregate([{$match: { dataDaVenda:{   $gte: intervalo_inicio,$lt: intervalo_fim } , estado:{$eq:1}}   },{       "$group": {"_id": null  ,     "DESCONTO":{ "$sum":"$desconto" } }     }     ] )
 

  var tudo=await this.vendaModel.aggregate(  [{$match: { dataDaVenda:{   $gte: intervalo_inicio,$lt: intervalo_fim },    estado:{$eq:1}}   },{ $project: {venda:"$codigo", codigo:"$itens.codigo",quantidade:"$itens.quantidade",demanda:"$itens.demanda",precoCompra:"$itens.precoCompra",subtotal:"$itens.subtotal"  }  }]  )

console.log("gggggggggggg",intervalo_inicio, "ff",intervalo_fim  )
    
// aqui verifica em cada item de cada documento;  
var itens_atacado=0
var itens_varejo=0
var itens_atacado_pc=0
var itens_atacado_pv=0

var itens_varejo_pc=0
var itens_varejo_pv=0
   for(var i=0; i<tudo.length;i++){
    for(var j=0; j<tudo[i].demanda.length;j++){
       if(tudo[i].demanda[j]=="atacado"){
         itens_atacado=itens_atacado+tudo[i].quantidade[j]
         itens_atacado_pv=itens_atacado_pv+tudo[i].subtotal[j]
         itens_atacado_pc=itens_atacado_pc+tudo[i].quantidade[j]*tudo[i].precoCompra[j]
      
        }

       if(tudo[i].demanda[j]=="varejo"){
        itens_varejo=itens_varejo+tudo[i].quantidade[j]
        itens_varejo_pv=itens_varejo_pv+tudo[i].subtotal[j]
        itens_varejo_pc=itens_varejo_pc+tudo[i].quantidade[j]*tudo[i].precoCompra[j]
      }
    }
   }
var totalvendas=await this.vendaModel.find({estado:{$eq:1}, dataDaVenda:{   $gte: intervalo_inicio,$lt: intervalo_fim }}).count()
var resposta=[itens_atacado, itens_varejo, totalvendas,itens_atacado_pc, itens_atacado_pv, itens_varejo_pc,  itens_varejo_pv  ]
// aqui verifica em cada item de cada documento;  





  // forma antiga de fazer; ia em cada documento se achar um item no atacado ja conta aquele documento como venda no atacado e varejo faz o mesmo  
    // var  atacado= await this.vendaModel.find({estado:{$eq:1}, "itens.demanda": { $eq: "atacado" } } ).count()
    // var  varejo= await this.vendaModel.find({estado:{$eq:1}, "itens.demanda": { $eq: "varejo" } } ).count()
    // var totalvendas=await this.vendaModel.find().count()
   
    // var intersecao=(atacado+varejo)-totalvendas
    // atacado=atacado-intersecao
    // varejo=varejo-intersecao
    // var atacadovarejo=intersecao

    // var resposta=[atacado, varejo, intersecao]
    
    return resposta
    }




}
