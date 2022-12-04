import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ProdutoService } from 'src/produto/services/produto.service';
import { Result } from 'src/shared/result.model';
import { JwtAuthGuard } from 'src/usuarios/auth/jwt-auth.guard';
import { VendaDto } from '../dto/venda.dto';
import { Venda } from '../model/venda.model';
import { VendaService } from '../services/venda.service';

@Controller('venda')
export class VendaController {
  constructor(private vendaService: VendaService,
              private produtoService: ProdutoService) {}





 // @UseGuards(JwtAuthGuard)
 @Post('totalVendedor')
 async findAllVendedor(@Body() datas: any): Promise<any> {
   return await this.vendaService.getAllVendedor(datas.inicio, datas.fim);
 }



  // @UseGuards(JwtAuthGuard)
@Post('getquantidadeItensVendidos')
async getquantidadeItensVendidos(@Body() datas: any): Promise<any> {
  return await this.vendaService.getquantidadeItensVendidos(datas.inicio, datas.fim);
}





 // @UseGuards(JwtAuthGuard)
@Post('totalPorFormaDePagamento')
 async findAllFormaDePagamento(@Body() datas: any): Promise<any> {
   return await this.vendaService.getAllFormaPagamento(datas.inicio, datas.fim);
 }



  // @UseGuards(JwtAuthGuard)
@Post('getPorValorTotalDaVenda')
async getPorValorTotalDaVenda(@Body() datas: any): Promise<any> {
  return await this.vendaService.getAllValorTotalDaVenda(datas.inicio, datas.fim);
}











  // @UseGuards(JwtAuthGuard)
  @Post('getQuantidadeVendidaCodigoTamanho')
  async getQuantidadeVendidaCodigoTamanho(@Body()  item: any): Promise<any> {

    console.log("codigo",item.codigo, item.tamanho)

    const res=await this.vendaService.getQuantidadeVendidaCodigoTamanho(item.codigo,item.tamanho);
    var total=0
     for(var i=0; i<res.length; i++){
        total+=res[i].itens[0].quantidade
     }

    return total;
  }

  


  // @UseGuards(JwtAuthGuard)
  @Post('getAllValorTotalDesconto')
  async getAllValorTotalDesconto(@Body() datas: any): Promise<any> {
    return await this.vendaService.getAllValorDesconto(datas.inicio, datas.fim);
  }
  
  
   // @UseGuards(JwtAuthGuard)
   @Post('getAllValorPrecoCompra')
   async getAllValorPrecoCompra(@Body() datas: any): Promise<any> {
     return await this.vendaService.getAllValorPrecoCompra(datas.inicio, datas.fim);
   }
  
   
//@UseGuards(JwtAuthGuard)
@Post('estado')

async estado(@Body() datas: any ): Promise<Venda[]> {

   console.log("fgfgfgTTTTTTTTTTTTTTTT", datas)
  return await this.vendaService.getByEstado(datas.inicio, datas.fim);
 
}







 // @UseGuards(JwtAuthGuard)
 @Post("obterQuantidadeVendidaItensAtacadoVarejo")
 async obterQuantidadeItenAtacado(@Body() datas: any ): Promise<any> {
   return await this.vendaService.obterQuantidadeVendidaItensAtacadoVarejo(datas.inicio, datas.fim)
 }



  

 // @UseGuards(JwtAuthGuard)
 @Get()
 async findAll(): Promise<any> {
   return await this.vendaService.getAll();
 }




  //@UseGuards(JwtAuthGuard)
  @Post()
  async executaVenda(@Body() vendaDto: VendaDto) {


console.log("RRRRRRRRRRRRRRRRRRRRRRRR", vendaDto)

    var codigo=await this.vendaService.getMaiorCodigo();
  
    const venda = new Venda(
      vendaDto.cliente,
      vendaDto.demanda,
      vendaDto.vendedor,
      vendaDto.itens,
      vendaDto.formaPagamento,
      vendaDto.total ,
      vendaDto.valorRecebido,
      vendaDto.desconto,
      vendaDto.acrescimo,
      vendaDto.troco,
      vendaDto.custoVenda,
      vendaDto.estado,
      codigo+1,
      vendaDto.pix,
      vendaDto.dinheiro,
      vendaDto.debito,
      vendaDto.credito,
      new Date()
    );


    console.log("CONTADORRRRRRRRRRRRRRR" )
var contador=0
 for(var j=0;j<venda.itens.length; j++){

    var produto = await this.produtoService.getItemValidoParaVenda(venda.itens[j].codigo, venda.itens[j].quantidade,venda.itens[j].tamanho);
    if(produto){
          contador++   
      }else{
        console.log("NAO valido",j+1,"AAAA",venda.itens[j].codigo, "HHHH",venda.itens[j].quantidade,"HHH",venda.itens[j].tamanho )
     
    }

 
  }

  console.log("CONTADOR",contador )


////

  if(contador==venda.itens.length){

  for(var j=0;j<venda.itens.length; j++){
    var produto = await this.produtoService.getItemValidoParaVenda(venda.itens[j].codigo, venda.itens[j].quantidade,venda.itens[j].tamanho);
    for(var i=0;i<produto.tamanhos.length;i++){
            if(produto.tamanhos[i].tamanho==venda.itens[j].tamanho){
              produto.tamanhos[i].quantidade-=venda.itens[j].quantidade
            }
    }
       await this.produtoService.updatePeloCodigo(produto.codigo,produto) 
  }


return  new Result('Venda efetuada com sucesso!', true, await this.vendaService.create(venda) , null)
}else{
  return     new Result('Venda nao efetuada por falta de produto!', true, [] , null);

}







  }









    //@UseGuards(JwtAuthGuard)
    @Post('repor')
    async repor(@Body() vendaDto: any) {



   for(var i=0; i<vendaDto.itens.length;i++ )
   {   
    console.log("AAAAAAAAAAAAAAAAAAA", vendaDto.itens) 
     
    var produto =  await this.produtoService.getByCodigo(vendaDto.itens[i].codigo);

     console.log("fdfdfdfdfdfdfdf", produto)

          for(var j=0; j<produto.tamanhos.length; j++){
                if(vendaDto.itens[i].tamanho==produto.tamanhos[j].tamanho){
                       produto.tamanhos[j].quantidade+=vendaDto.itens[i].quantidade

                       console.log("CCCCCCCCCCCCCCCCC", produto)
                       await this.produtoService.updatePeloCodigo(produto.codigo,produto)

                      vendaDto.estado=0
                      await this.vendaService.update(vendaDto._id ,vendaDto)
                }
            

          }
   }
    

    }

    




}


