

import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put } from '@nestjs/common';

import { Result } from 'src/shared/result.model';
import { ClienteDto } from '../dto/cliente.dto';
import { Cliente } from '../model/cliente.model';
import { ClienteService } from '../services/cliente.service';


@Controller({ path: 'cliente'})
@Controller()
export class ClienteController {

    constructor(private clienteService:ClienteService) {}
  
   
 
  
   // @UseGuards(JwtAuthGuard)
     @Get()
    async findAll(): Promise<any> {
      return await this.clienteService.getAll();
    }



    @Get('estado/:estado')
    async findAtivos(@Param('estado') estado: number):  Promise<Cliente> {
  console.log("estado", estado)
  
      return await this.clienteService.getByEstado(estado)
    }



 
  
    //@UseGuards(JwtAuthGuard)
    @Get(':id')
    async findOne(@Param('id') id: string):  Promise<Cliente> {
      return await this.clienteService.getById(id)
    }
  

 
    //@UseGuards(JwtAuthGuard)
    @Get('localizar/:cpf')
    async findOneCpf(@Param('cpf') cpf: string):  Promise<Cliente> {
      return await this.clienteService.getByCpf(cpf)
    }
  








    


  
  // @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() clienteDto:ClienteDto){

    try{
        
      const produto = new Cliente(clienteDto.nome,clienteDto.cpf,clienteDto.cnpj,
        clienteDto.email,clienteDto.bairro,clienteDto.cep,
        clienteDto.complemento,clienteDto.logradouro,clienteDto.numero,
        clienteDto.pontoReferencia,clienteDto.telefone,   clienteDto.estado,

        
        
        );

      console.log("produtoxxxxxxxxxxxxxxxxxx4444")   


      const res= await this.clienteService.create(produto)
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
    async update(@Body() cliente, @Param('id') id:string): Promise<Cliente> {
      return await this.clienteService.update(id,cliente)
    }
  
   // @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async delete(@Param('id') id:string): Promise<[]> {
      await this.clienteService.delete(id);
      return []
    }
  
  
  
  
  
  
  
  
  }
  