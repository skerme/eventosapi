import { PessoalController } from './controllers/pessoal.controller';
import { PessoalService } from './service/pessoal.service';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { PessoalSchema } from './schema/pessoal.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      // para poder usar o mongoose  111
      {
        name: 'Pessoal',
        schema: PessoalSchema,
      },
    ]),
  ],
  controllers: [PessoalController],
  providers: [PessoalService],
})
export class PessoalModule {}
