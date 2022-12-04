
import { CompraModule } from './compra/compra.module';
import { EstatisticaModule } from './estatistica/estatistica.module';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProdutoModule } from './produto/produto.module';
import { VendaModule } from './venda/venda.module';
import { UsuarioModule } from './usuarios/usuario.module';
import { LivrocaixaModule } from './livrocaixa/livrocaixa.module';
import { ClienteModule } from './cliente/cliente.module';
import { PessoalModule } from './pessoal/pessoal.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CompraController } from './compra/controllers/compra.controller';


@Module({


  imports: [
    CompraModule,
    EstatisticaModule,
    PessoalModule,
    ClienteModule,
    LivrocaixaModule,
    VendaModule,
    UsuarioModule,
    ProdutoModule,
    PessoalModule,
   // MongooseModule.forRoot('mongodb://localhost/gestao'), // para poder usar o mongoose  111

    MongooseModule.forRoot(
     // 'mongodb+srv://gestao:mQP9ofYvsZjiCqph@cluster0.4ep0j.mongodb.net/gestao?retryWrites=true&w=majority',

     'mongodb+srv://modasnome:yNIbV5iNNmGMwNgg@cluster0.wcg1rbt.mongodb.net/?retryWrites=true&w=majority',
     ), // para poder usar o mongoose  111

    // compass  mongodb+srv://gestao:mQP9ofYvsZjiCqph@cluster0.4ep0j.mongodb.net/gestao

    // shell mongosh "mongodb+srv://cluster0.4ep0j.mongodb.net/gestao" --apiVersion 1 --username gestao
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }







