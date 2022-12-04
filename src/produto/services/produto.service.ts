import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import console from 'console';
import { Model } from 'mongoose';
import { QueryDto } from 'src/produto/dto/query-produto.dto';
import { HistoricoProduto, Produto } from 'src/produto/model/produto.model';

@Injectable()
export class ProdutoService {
  constructor(
    @InjectModel('Produto') private readonly produtoModel: Model<Produto>,
    @InjectModel('HistoricoProduto') private readonly historicoProdutoModel: Model<HistoricoProduto>,
  ) {}






  async listaDeTodosOSCodigoCadastradosEAtivos() {
    return await this.produtoModel.find({estado:1},{"_id":0, "codigo":1});
 }



  async getEstoqueQuantidadeItens( ) { 


    var resultado=await this.produtoModel.aggregate([{$match: { estado:{$eq:1}}   },{ $project: {"quantidade": { $sum:"$tamanhos.quantidade"}  , "precoCompra": "$precoCompra" }  }])

    var total=0
    for(var i=0; i<resultado.length;i++){

     // console.log("ZZZZZZZZZZZZZZZZZZZZ",i,resultado[i], resultado[i].quantidade*resultado[i].precoCompra  )
         total+=resultado[i].quantidade

    }

    

    return total
  }




  async getEstoquePrecoDecusto( ) { 


    var resultado=await this.produtoModel.aggregate([{$match: { estado:{$eq:1}}   },{ $project: {"quantidade": { $sum:"$tamanhos.quantidade"}  , "precoCompra": "$precoCompra" }  }])

    var total=0
    for(var i=0; i<resultado.length;i++){

     // console.log("ZZZZZZZZZZZZZZZZZZZZ",i,resultado[i], resultado[i].quantidade*resultado[i].precoCompra  )
         total+=resultado[i].quantidade*resultado[i].precoCompra

    }

    

    return total
  }

  
  async getPvVarejo() { 

    var resultado=await this.produtoModel.aggregate([{$match: { estado:{$eq:1}}   },{ $project: {"quantidade": { $sum:"$tamanhos.quantidade"}  , "precoVendaVarejo": "$precoVendaVarejo" }  }])

    var total=0
    for(var i=0; i<resultado.length;i++){

   //   console.log("ZZZZZZZZZZZZZZZZZZZZ",i,resultado[i] )
         total+=resultado[i].quantidade*resultado[i].precoVendaVarejo

    }


    return total

  }



  async getPvAtacado( ) {


    var resultado=await this.produtoModel.aggregate([{$match: { estado:{$eq:1}}   },{ $project: {"quantidade": { $sum:"$tamanhos.quantidade"}  , "precoVendaAtacado": "$precoVendaAtacado" }  }])

    var total=0
    for(var i=0; i<resultado.length;i++){

     // console.log("ZZZZZZZZZZZZZZZZZZZZ",i,resultado[i] )
         total+=resultado[i].quantidade*resultado[i].precoVendaAtacado

    }


    return total


  }













  //verifica se o codigo tem a quantidade solciitado, no tamanho solicitado, e se o codigo esta ativo;
  async getItemValidoParaVenda(codigo: number, quantidade:number,tamanho:string) {
    return await this.produtoModel.findOne({"$and":[{ "codigo": { "$eq":codigo}} ,{ "estado": { "$eq":1 }}, {tamanhos: {$elemMatch: { "tamanho": { "$eq":tamanho}, "quantidade":{ "$gte":quantidade }}}}     ] }    ) .exec();
  }

 
  async getItemDiponivel(codigo: number) {
    return await this.produtoModel.findOne(    {"$and":[{ "codigo": { "$eq":codigo}} ,{ "estado": { "$eq":1 }} ] }     )
  }

 
  async verificaDisponibilidadePorCodigo(codigo: number) {
    
    const resultado=await this.produtoModel.findOne(    {"$and":[{ "codigo": { "$eq":codigo}} ,{ "estado": { "$eq":1 }} ] }     )

 var resposta=0   
    if(resultado){
    resposta=resultado.tamanhos[0].quantidade+resultado.tamanhos[1].quantidade+resultado.tamanhos[2].quantidade+resultado.tamanhos[3].quantidade+resultado.tamanhos[4].quantidade+resultado.tamanhos[5].quantidade+resultado.tamanhos[6].quantidade+
    resultado.tamanhos[7].quantidade+resultado.tamanhos[8].quantidade+resultado.tamanhos[9].quantidade+resultado.tamanhos[10].quantidade+resultado.tamanhos[11].quantidade


    }

    return  resposta
  }

 


  async getAll() {
     return await this.historicoProdutoModel.find().sort({dataAlteracao:-1}).limit(500);
  }



//mostra os ativos e INATIVOS
  async getQuantidadeDocumentos() {
    const  resultado= await this.produtoModel.find().count() 
     return resultado[0].codigo
   }



  async getMaiorCodigo(): Promise<number>{



    var  resultado= await this.produtoModel.find().sort( {"codigo" : -1 } ).limit(1) 
   var resposta: number=0



    if(resultado.length==0){
      resposta=0
      
    }else{

      resposta=resultado[0].codigo
    }
   


    return resposta
  }






  async getById(id: string) {
    return await this.produtoModel.findById(id).exec();
  }

  async getByEstado(estado: number):Promise<Produto[]> {
    return await this.produtoModel.find({estado:estado}).sort({codigo:-1}).exec();
  }


  async getByCodigo(codigo: number):Promise<Produto> {
    return await this.produtoModel.findOne({codigo:codigo}).exec();
  }



  async create(colecao: string, produto: Produto) {
    
    
   
      return await new this.produtoModel(produto).save();
 
     
 
   
  }


  async createHistorico(colecao: string, produto: HistoricoProduto) {
    
    
    
      return await new this.historicoProdutoModel(produto).save();
 
   
  }




  async update(id: string, produto: Produto): Promise<Produto> {
 
  // console.log("HHHHHHHHHHHHHHH")
    

    await this.produtoModel.findByIdAndUpdate({ _id: id }, produto).exec();
    return this.getById(id);
  }

  async updatePeloCodigo(codigo: number, produto: Produto): Promise<String> {
    await this.produtoModel.updateOne({ "codigo": codigo }, produto).exec();
    return "produto atualizado";
  }






  async delete(id: string) {
    await this.produtoModel.deleteOne({ _id: id }).exec();
    return id;
  }

  async query(model: QueryDto): Promise<Produto[]> {
    return []
    
    await this.produtoModel
      .find(model.query, model.fields, {
        sort: model.sort,
        skip: model.skip,
        limit: model.take,
      })
      .exec();
   }




         //mostra os ativos e INATIVOS
         async getCodigoEntrada(inicio=new Date() ,  fim=new Date(), codigo) {

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
        
            
        
            
         
      
      
      
      
      
      
          const  resultado= await this.historicoProdutoModel.aggregate([{$match: { dataAlteracao:{   $gte:intervalo_inicio,$lt:  intervalo_fim }, codigo:{$eq:codigo}}   },{"$group": {"_id": null  ,"ACRESCIMO":{ "$sum":"$quantAjustada" } }     }     ] )
  var resposta=0    
      
      if (resultado.length==0){
        resposta=0
      }
      else {
        resposta=resultado[0].ACRESCIMO
      }


      
           return resposta
         }   
}
