import { ItemDto } from './../../venda/dto/item.dto';
import { JwtAuthGuard } from '../../usuarios/auth/jwt-auth.guard';
import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, UseGuards, UseInterceptors } from '@nestjs/common';
import { ValidatorInterceptor } from 'src/shared/validator.interceptor';
import { QueryContract } from 'src/produto/contracts/query.contract';
import { ProdutoDto } from 'src/produto/dto/produto.dto';
import { QueryDto } from 'src/produto/dto/query-produto.dto';
import { Produto, HistoricoProduto } from 'src/produto/model/produto.model';
import { Result } from 'src/shared/result.model';
import { ProdutoService } from 'src/produto/services/produto.service';
import { InjectModel } from '@nestjs/mongoose';


@Controller({ path: 'produto' })
export class ProdutoController {

  constructor(private produtoService: ProdutoService
    ) {}





 //@UseGuards(JwtAuthGuard)
 @Get('estado/:estado')
 async estado(@Param('estado') estado:number ): Promise<Produto[]> {
   return await this.produtoService.getByEstado(estado);
 }






    //mostra os ativos e INATIVOS
 // @UseGuards(JwtAuthGuard)
  @Get('getEstoqueQuantidadeItens')
  async getEstoqueQuantidadeItens(): Promise<number> {
    return await this.produtoService.getEstoqueQuantidadeItens();
  }



  


  
  // @UseGuards(JwtAuthGuard)
  @Get('getEstoquePrecoDecusto')
  async getEstoquePrecoDecusto(): Promise<any> {
    return await this.produtoService.getEstoquePrecoDecusto();
  }
  


    // @UseGuards(JwtAuthGuard)
    @Get('getPvAtacado')
    async getPvAtacado(): Promise<any> {
      return await this.produtoService.getPvAtacado();
    }
  
    
      // @UseGuards(JwtAuthGuard)
  @Get('getPvVarejo')
  async getPvVarejo(): Promise<any> {
    return await this.produtoService.getPvVarejo();
  }
  










//ESSE AQUI VAI SER USADO APENAS PARA O HISTORICOPRODUTO

 // @UseGuards(JwtAuthGuard)
   @Get()
  async findAll(): Promise<any> {
    return await this.produtoService.getAll();
  }


 //ESSE AQUI VAI SER USADO APENAS PARA O HISTORICOPRODUTO ///PEGA TUDO QUE TEM NA COLECAO num intervalo de tempo
   // @UseGuards(JwtAuthGuard)
   @Post('getCodigoEntrada')
   async getCodigoEntrada(@Body() datas: any): Promise<any> {


    console.log("ENTROU")

    var resposta=[]


  var cod= await this.produtoService.listaDeTodosOSCodigoCadastradosEAtivos()
//console.log("TTTTT", cod2,cod2[0].codigo,cod2[1].codigo)

//var cod=[2,3,4,5,9,12,13,17,19,24,33,34,40,41,42,45,66,68,75,76,91,96,99,118,121,122,123,124,126,127,128,129,130,131,133,134,135,136,137]





for(var i=0; i<cod.length; i++){
  resposta.push({codigo:cod[i].codigo, entrada:await this.produtoService.getCodigoEntrada(datas.inicio, datas.fim, cod[i].codigo),final:await this.produtoService.verificaDisponibilidadePorCodigo(cod[i].codigo)})
}
    console.log("SAIU")
     return await resposta
   }
 ////////////////////////////////////////////////////////////////////////////////////////////////////////////////




//ESSE AQUI VAI SER USADO APENAS PARA O HISTORICOPRODUTO  

  //@UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string):  Promise<Produto> {
    return await this.produtoService.getById(id)
  }









 // @UseGuards(JwtAuthGuard)
 @Post('colecao/:colecao')
 async create(@Body() produtoDto:HistoricoProduto ,   @Param('colecao') colecao:string){

   try{
     console.log("DADOS DO PRODUTO", produtoDto, await this.produtoService.getMaiorCodigo())
     
     
     
     var codigo=await this.produtoService.getMaiorCodigo();
     
 
     console.log("DADOS DO PRODUTOsXXXXXXXXXXXXXXXXXXXXXXXXXXX", produtoDto)



     if(colecao=='p'){



      
     const produto = new Produto(codigo+1, produtoDto.descricao, produtoDto.precoCompra, produtoDto.precoVendaVarejo,produtoDto.precoVendaAtacado,new Date(),new Date(), 1,produtoDto.tamanhos);
     const res= await this.produtoService.create(colecao,produto)
     return     new Result('Produto criado com sucesso!', true, res , null);
     }
     else{

      const produto = new  HistoricoProduto(produtoDto.codigo, produtoDto.descricao, produtoDto.precoCompra, produtoDto.precoVendaVarejo,produtoDto.precoVendaAtacado,produtoDto.dataCriacao ,new Date(),  1,produtoDto.tamanhos,produtoDto.quantAjustada);
      const res= await this.produtoService.createHistorico(colecao,produto)
      return     new Result('Produto criado com sucesso!!!!', true, res , null);

     }

    


     
  
     
     }
    catch (error){
     //ROOLABACK MANUAL
     throw new HttpException(new Result('Nao foi possivel realizar seu cadastro', false,null,error), HttpStatus.BAD_REQUEST);
  }

  
  
   }





   // @UseGuards(JwtAuthGuard)
 @Post('verificaDisponibilidade')
 async verificaDisponibilidade(@Body() dados ){ 
  return  await this.produtoService.getItemDiponivel(dados.codigo );
}

@Post('verificaDisponibilidadePorCodigo')
async verificaDisponibilidadePorCodigo(@Body() dados ){ 
 return  await this.produtoService.verificaDisponibilidadePorCodigo(dados.codigo );
}


 // @UseGuards(JwtAuthGuard)
  @Post('query')    
  @UseInterceptors(new ValidatorInterceptor(new QueryContract()))
     async query(@Body() model:QueryDto) {
 
       const customers= await this.produtoService.query(model);
        return  new Result(null,true,customers,null);
     }  

     


 // @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(@Body() produto, @Param('id') id:string): Promise<Produto> {

    


   produto.dataAlteracao= new Date()

   console.log(" yyyyyyyyyyYYYYYYYYYYYYY", produto)

    return await this.produtoService.update(id,produto)
  }

 // @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id:string): Promise<[]> {
    await this.produtoService.delete(id);
    return []
  }












}
