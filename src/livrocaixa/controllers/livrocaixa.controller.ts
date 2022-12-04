import { LivroCaixa } from './../model/livrocaixa.model';

import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { LivrocaixaService } from '../services/livrocaixa.service';
import { LivroCaixaDto } from '../dto/livrocaixa.dto';
import { Result } from 'src/shared/result.model';


@Controller({ path: 'livrocaixa'   })

// @Controller({ path: 'livrocaixa'  , host: 'https://gestaoapi.herokuapp.com'    })
@Controller()
export class LivrocaixaController {

    constructor(private livroCaixaService:LivrocaixaService) {}
  
   
 
    @Post('estado')
    async findAtivos(@Body() datas: any ):  Promise<LivroCaixa> {
 
  
      return await this.livroCaixaService.getByEstado(datas.inicio, datas.fim, datas.perfil)



      
    }


    

@Post('aberturacaixa')

async estadoaberturacaixa(@Body() datas: any ): Promise<LivroCaixa[]> {

  // console.log("fgfgfgTTTTTTTTTTTTTTTT", datas)
  return await this.livroCaixaService.getByEstadoaberturacaixa(datas.inicio, datas.fim, datas.perfil);
 
}




  
   // @UseGuards(JwtAuthGuard)
     @Get()
    async findAll(): Promise<any> {
      return await this.livroCaixaService.getAll();
    }
  
      //@UseGuards(JwtAuthGuard)
  @Post('getAllDespesaTotalPeriodo')
  async getAllDespesaTotalPeriodo(@Body() datas: any):  Promise<any> {

console.log("rrrrrrrrrrrRRRRRRRRRRRRRRRRRRRRRRR", datas)

    return await this.livroCaixaService.getAllDespesaTotalPeriodo(datas.inicio, datas.fim)
  }

  
    //@UseGuards(JwtAuthGuard)
    @Get(':id')
    async findOne(@Param('id') id: string):  Promise<LivroCaixa> {
      return await this.livroCaixaService.getById(id)
    }
  





    


  
  // @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() livroCaixaDto:LivroCaixaDto){

    try{
    
     var  conversaoemdata=  new Date(livroCaixaDto.data)
    
      const produto = new LivroCaixa(livroCaixaDto.descricao,livroCaixaDto.valor,conversaoemdata, livroCaixaDto.perfil);

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






 
  // @UseGuards(JwtAuthGuard)
  @Post('aberturaCaixa')
  async createaberturaCaixa(@Body() livroCaixaDto:LivroCaixaDto){

    try{
    
     var  conversaoemdata=  new Date(livroCaixaDto.data)
    
      const produto = new LivroCaixa(livroCaixaDto.descricao,livroCaixaDto.valor,conversaoemdata, livroCaixaDto.perfil);

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









 
       
  
  
   // @UseGuards(JwtAuthGuard)
    @Put(':id')
    async update(@Body() livroCaixa, @Param('id') id:string): Promise<LivroCaixa> {
      return await this.livroCaixaService.update(id,livroCaixa)
    }
  
   // @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async delete(@Param('id') id:string): Promise<[]> {
      await this.livroCaixaService.delete(id);
      return []
    }
  
  
  
  
  
  
  
  
  }
  