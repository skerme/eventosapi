/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { Result } from 'src/shared/result.model';
import { PessoalDto } from '../dto/pessoal.dto';
import { Pessoal } from '../model/pessoal.model';
import { PessoalService } from '../service/pessoal.service';

@Controller('pessoal')
export class PessoalController {

    constructor(private pessoalService:PessoalService) {}
  
   
 



  
   // @UseGuards(JwtAuthGuard)
     @Get()
    async findAll(): Promise<any> {
      return await this.pessoalService.getAll();
    }
  


 
  
    //@UseGuards(JwtAuthGuard)
    @Get(':id')
    async findOne(@Param('id') id: string):  Promise<Pessoal> {
      return await this.pessoalService.getById(id)
    }
  





    @Get('estado/:casa')
    async findAtivos(@Param('casa') estado: number):  Promise<Pessoal> {
  console.log("estado", estado)
  
      return await this.pessoalService.getByEstado(estado)
    }




  
//@UseGuards(JwtAuthGuard)
@Post('estadocargo')
async estado(@Body() estado:any ): Promise<Pessoal[]> {



console.log("dsds", estado.estado, "ddddddd", estado)

  return await this.pessoalService.getByEstadoCargo(estado.estado,estado.cargo);
}


    


  
  // @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() pessoalDto:PessoalDto){

    try{
        
      const produto = new Pessoal(pessoalDto.nome,pessoalDto.cpf,pessoalDto.cargo,
       pessoalDto.email,pessoalDto.dataNascimento,
        pessoalDto.dataAdmissao,pessoalDto.salarioBase,pessoalDto.bairro,
        pessoalDto.cep,pessoalDto.complemento,pessoalDto.logradouro,
        pessoalDto.numero,pessoalDto.pontoReferencia,pessoalDto.telefone, pessoalDto.estado
        
        
        );

      console.log("produtoxxxxxxxxxxxxxxxxxx4444")   


      const res= await this.pessoalService.create(produto)
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
    async update(@Body() pessoal, @Param('id') id:string): Promise<Pessoal> {
      return await this.pessoalService.update(id,pessoal)
    }
  
   // @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async delete(@Param('id') id:string): Promise<[]> {
      await this.pessoalService.delete(id);
      return []
    }
  
  
  
  
  
  
  
  
  }
  