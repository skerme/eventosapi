import { VendaModule } from './../venda/venda.module';
import { EstatisticaService } from './services/estatistica.service';
import { EstatisticaController } from './controllers/estatistica.controller';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { EstatisticaSchema } from './schema/estatistica.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [    VendaModule,

    MongooseModule.forFeature([
        // para poder usar o mongoose  111
        {
          name: 'Estatistica',
          schema: EstatisticaSchema ,
        }
      ]),



  ],
  controllers: [EstatisticaController],
  providers: [EstatisticaService],
})
export class EstatisticaModule {}
