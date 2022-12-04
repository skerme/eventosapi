import { LivrocaixaService } from './services/livrocaixa.service';
import { LivrocaixaController } from './controllers/livrocaixa.controller';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LivroCaixaSchema } from './schema/livrocaixa.schema';

@Module({
  imports: [

   
    
    MongooseModule.forFeature([
        // para poder usar o mongoose  111
        {
          name: 'LivroCaixa',
          schema: LivroCaixaSchema ,
        }
      ]),







  ],
  controllers: [LivrocaixaController],
  providers: [LivrocaixaService],
})
export class LivrocaixaModule {









}
