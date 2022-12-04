/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { defaultThrottleConfig } from 'rxjs/internal/operators/throttle';



import { Result } from 'src/shared/result.model';
import { VendaService } from 'src/venda/services/venda.service';

import { EstatisticaDto } from '../dto/estatistica..dto';
import { Estatistica } from '../model/estatistica.model';
import { EstatisticaService } from '../services/estatistica.service';



@Controller('estatistica')
export class EstatisticaController {

    constructor(private livroCaixaService:EstatisticaService,
      private vendaService: VendaService
      
      ) {}


       
//mostra TODOS OS DOCUMENTOS (ativos e INATIVOS)
 // @UseGuards(JwtAuthGuard)
 @Get('quantidadeDocumentos')
 async quantidadeDocumentos(): Promise<number> {

 console.log("PPPPPPPPPPPPPPPPPPPPPPPPPPPP55555555555555")


   return await this.livroCaixaService.getQuantidadeDocumentos();
 }



 

 ///PEGA TUDO QUE TEM NA COLECAO num intervalo de tempo que que nao seja abertura de caixa
   // @UseGuards(JwtAuthGuard)
   @Post('getUltimoDocumento')
   async getUltimoDocumento(@Body() datas: any): Promise<any> {



    

    console.log("ssssssssssssssssss5555555555555")
     return await this.livroCaixaService.getUltimoDocumento(datas.inicio, datas.fim);
   }
 




  
   
 ///PEGA TODAS AS DESPESAS MENOS AQUELA COM O TEXTO "ABERTURA DE CAIXA" DE DATA1 A DATA2
    @Post('estado')
    async findAtivos(@Body() datas: any ):  Promise<Estatistica> {
 
  
      return await this.livroCaixaService.getByEstado(datas.inicio, datas.fim, datas.perfil)
    }


    
///PEGA TODAS AS ABERTURAS DE CAIXA DE DATA1 A DATA2"
@Post('aberturacaixa')

async estadoaberturacaixa(@Body() datas: any ): Promise<Estatistica[]> {

  // console.log("fgfgfgTTTTTTTTTTTTTTTT", datas)
  return await this.livroCaixaService.getByEstadoaberturacaixa(datas.inicio, datas.fim, datas.perfil);
 
}




  ///PEGA TUDO QUE TEM NA COLECAO num intervalo de tempo que que nao seja abertura de caixa
   // @UseGuards(JwtAuthGuard)
     @Get()
    async findAll(): Promise<any> {
      return await this.livroCaixaService.getAll();
    }
  


 // RETORNA O VALOR TOTAL DAS DESPESAS DO PERIODO      
      //@UseGuards(JwtAuthGuard)
  @Post('getAllDespesaTotalPeriodo')
  async getAllDespesaTotalPeriodo(@Body() datas: any):  Promise<any> {

console.log("rrrrrrrrrrrRRRRRRRRRRRRRRRRRRRRRRR", datas)

    return await this.livroCaixaService.getAllDespesaTotalPeriodo(datas.inicio, datas.fim)
  }

  

// RETORNA O DOCUMENTO POR ID    
    //@UseGuards(JwtAuthGuard)
    @Get(':id')
    async findOne(@Param('id') id: string):  Promise<Estatistica> {
      return await this.livroCaixaService.getById(id)
    }
  





    


  // CADASTRA UMA DESPESA  
  // @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() livroCaixaDto:EstatisticaDto){

    try{
    

    
     const produto = new Estatistica(livroCaixaDto.descricao,livroCaixaDto.valor,new Date(), livroCaixaDto.perfil, livroCaixaDto.pc, livroCaixaDto.pvv, livroCaixaDto.pva, livroCaixaDto.qdtItens);

      console.log("produtoxxxxxxxxxxxxxxxxxx4444")   


      const res= await this.livroCaixaService.create(produto)
       console.log("produto")   
      return     new Result('Cliente criado com sucesso!', true, res , null);
      }
     catch (error){
      //ROOLABACK MANUAL
      throw new HttpException(new Result('Nao foi possivel realizar seu cadastro', false,null,error), HttpStatus.BAD_REQUEST);
   }

}






 // CADASTRA UMA ABERTURA DE CAIXA
  // @UseGuards(JwtAuthGuard)
  @Post('aberturaCaixa')
  async createaberturaCaixa(@Body() livroCaixaDto:EstatisticaDto){

    try{
    
     var  conversaoemdata=  new Date(livroCaixaDto.data)
    
     const produto = new Estatistica(livroCaixaDto.descricao,livroCaixaDto.valor,conversaoemdata, livroCaixaDto.perfil, livroCaixaDto.pc, livroCaixaDto.pvv, livroCaixaDto.pva,livroCaixaDto.qdtItens);

      console.log("produtoxxxxxxxxxxxxxxxxxx4444")   


      const res= await this.livroCaixaService.createaberturaCaixa(produto)
       console.log("produto")   
      return     new Result('Cliente criado com sucesso!', true, res , null);
      }
     catch (error){
      //ROOLABACK MANUAL
      throw new HttpException(new Result('Nao foi possivel realizar seu cadastro', false,null,error), HttpStatus.BAD_REQUEST);
   }

}









 
       
  
   // ALTERA UM DOCUMENTO 
   // @UseGuards(JwtAuthGuard)
    @Put(':id')
    async update(@Body() livroCaixa, @Param('id') id:string): Promise<Estatistica> {
      return await this.livroCaixaService.update(id,livroCaixa)
    }
  

     // DELETA UM DOCUMENTO   
   // @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async delete(@Param('id') id:string): Promise<[]> {
      await this.livroCaixaService.delete(id);
      return []
    }
  
  
  
  
 ///quantidade de dias FUNCIONANDO
      // @UseGuards(JwtAuthGuard)
@Post('getDiasFuncionando')
async getDiasFuncionando(@Body() datas: any): Promise<any> {


  console.log("PPPPPPPPPPyy", datas)



var data1= new Date(datas.inicio)
var data2= new Date(datas.fim)


data1.setHours(0)
data1.setMinutes(0)
data1.setSeconds(0)
data1.setMilliseconds(0)


data1.setDate(data1.getDate())

data2.setHours(+24)
    data2.setMinutes(0)
    data2.setSeconds(0)
    data2.setMilliseconds(0)


console.log("PPPPPPPPPP", data1.getFullYear()==data2.getFullYear(),  data1.getMonth()==data2.getMonth(), data1.getDate()==data2.getDate())


var resposta=0
var funcionando=0
    while (!(data1.getFullYear()==data2.getFullYear() && data1.getMonth()==data2.getMonth() && data1.getDate()==data2.getDate())){
      resposta=0

      console.log("PPPPPPPPPP22", data1.getFullYear()==data2.getFullYear(),  data1.getMonth()==data2.getMonth(), data1.getDate()==data2.getDate(), "hhhhhhhhhhhhh", data1, data2,resposta, funcionando)

     resposta=await this.vendaService.getquantidadeItensVendidos(data1, data1)

 console.log("tttttttTTTTTTTTTTTTTTTTTTTshel", resposta )

      if(resposta!=0){
        funcionando++      
        console.log("hhhhhhhhhhhhh", data1, data2,resposta, funcionando)
      }

      data1.setDate(data1.getDate()+1)
    }


    console.log("PPPPPPPPPP3333", data1.getFullYear()==data2.getFullYear(),  data1.getMonth()==data2.getMonth(), data1.getDate()==data2.getDate(), "hhhhhhhhhhhhh", data1, data2,resposta, funcionando)

   // resposta=await this.vendaService.getquantidadeItensVendidos(data1, data1)
   // if(resposta!=0){
   //   funcionando++      
   //   console.log("hhhhhhhhhhhhh", data1, data2,resposta, funcionando)
  //  }




     return  funcionando
   }
 
  
  }
  