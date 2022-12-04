/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { Result } from 'src/shared/result.model';
import { CompraDto } from '../dto/venda.dto';
import { Compra } from '../model/venda.model';
import { CompraService } from '../services/compra.service';

@Controller('compra')
export class CompraController {

    constructor(private vendaService: CompraService, ) {} 
   //@UseGuards(JwtAuthGuard)
     @Post()
     async executaVenda(@Body() vendaDto: CompraDto) {
     
   console.log("RRRRRRRRRRRRRRRRRRRRRRRR", vendaDto)
   
       var codigo=await this.vendaService.getMaiorCodigo();
     
       const venda = new Compra(
         vendaDto.cliente,
         vendaDto.demanda,
         vendaDto.vendedor,
         vendaDto.itens,
         vendaDto.formaPagamento,
         vendaDto.total ,
         vendaDto.valorRecebido,
         vendaDto.frete,
         vendaDto.tributo,
         vendaDto.outros,
         vendaDto.custoDosItens,
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
   
 return  new Result('Venda efetuada com sucesso!', true, await this.vendaService.create(venda) , null)
     }

     
 
   // @UseGuards(JwtAuthGuard)
   @Get()
   async findAll(): Promise<any> {
     return await this.vendaService.getAll();
   }
  
  
     
//   //@UseGuards(JwtAuthGuard)
  @Post('estado')
  
  async estado(@Body() datas: any ): Promise<Compra[]> {
  
     console.log("fgfgfgTTTTTTTTTTTTTTTT", datas)
    return await this.vendaService.getByEstado(datas.inicio, datas.fim);
   
  }
  
  


    
   // @UseGuards(JwtAuthGuard)
   @Put(':id')
   async update(@Body() compra, @Param('id') id:string): Promise<Compra> {
     return await this.vendaService.update(id,compra)
   }
 
   
  
//    // @UseGuards(JwtAuthGuard)
//    @Post('totalVendedor')
//    async findAllVendedor(@Body() datas: any): Promise<any> {
//      return await this.vendaService.getAllVendedor(datas.inicio, datas.fim);
//    }
  
  
  
//     // @UseGuards(JwtAuthGuard)
//   @Post('getquantidadeItensVendidos')
//   async getquantidadeItensVendidos(@Body() datas: any): Promise<any> {
//     return await this.vendaService.getquantidadeItensVendidos(datas.inicio, datas.fim);
//   }
  
  
  
  
  
//    // @UseGuards(JwtAuthGuard)
//   @Post('totalPorFormaDePagamento')
//    async findAllFormaDePagamento(@Body() datas: any): Promise<any> {
//      return await this.vendaService.getAllFormaPagamento(datas.inicio, datas.fim);
//    }
  
  
  
//     // @UseGuards(JwtAuthGuard)
//   @Post('getPorValorTotalDaVenda')
//   async getPorValorTotalDaVenda(@Body() datas: any): Promise<any> {
//     return await this.vendaService.getAllValorTotalDaVenda(datas.inicio, datas.fim);
//   }
  
  
  
  
  
  
  
  
  
  
  
//     // @UseGuards(JwtAuthGuard)
//     @Post('getQuantidadeVendidaCodigoTamanho')
//     async getQuantidadeVendidaCodigoTamanho(@Body()  item: any): Promise<any> {
  
//       console.log("codigo",item.codigo, item.tamanho)
  
//       const res=await this.vendaService.getQuantidadeVendidaCodigoTamanho(item.codigo,item.tamanho);
//       var total=0
//        for(var i=0; i<res.length; i++){
//           total+=res[i].itens[0].quantidade
//        }
  
//       return total;
//     }
  
    
  
  
//     // @UseGuards(JwtAuthGuard)
//     @Post('getAllValorTotalDesconto')
//     async getAllValorTotalDesconto(@Body() datas: any): Promise<any> {
//       return await this.vendaService.getAllValorDesconto(datas.inicio, datas.fim);
//     }
    
    
//      // @UseGuards(JwtAuthGuard)
//      @Post('getAllValorPrecoCompra')
//      async getAllValorPrecoCompra(@Body() datas: any): Promise<any> {
//        return await this.vendaService.getAllValorPrecoCompra(datas.inicio, datas.fim);
//      }
    

  
  
  
  
  
//    // @UseGuards(JwtAuthGuard)
//    @Post("obterQuantidadeVendidaItensAtacadoVarejo")
//    async obterQuantidadeItenAtacado(@Body() datas: any ): Promise<any> {
//      return await this.vendaService.obterQuantidadeVendidaItensAtacadoVarejo(datas.inicio, datas.fim)
//    }
  
  
  
    
 
 
  
  
  
  
    //   //@UseGuards(JwtAuthGuard)
    //   @Post('repor')
    //   async repor(@Body() vendaDto: any) {
  
  
  
    //  for(var i=0; i<vendaDto.itens.length;i++ )
    //  {   
    //   console.log("AAAAAAAAAAAAAAAAAAA", vendaDto.itens) 
       
    //   var produto =  await this.produtoService.getByCodigo(vendaDto.itens[i].codigo);
  
    //    console.log("fdfdfdfdfdfdfdf", produto)
  
    //         for(var j=0; j<produto.tamanhos.length; j++){
    //               if(vendaDto.itens[i].tamanho==produto.tamanhos[j].tamanho){
    //                      produto.tamanhos[j].quantidade+=vendaDto.itens[i].quantidade
  
    //                      console.log("CCCCCCCCCCCCCCCCC", produto)
    //                      await this.produtoService.updatePeloCodigo(produto.codigo,produto)
  
    //                     vendaDto.estado=0
    //                     await this.vendaService.update(vendaDto._id ,vendaDto)
    //               }
              
  
    //         }
    //  }
      
  
    //   }
  
      
  
  
  
  
  }
  
  
  