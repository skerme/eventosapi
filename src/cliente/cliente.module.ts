import { ClienteController } from './controllers/cliente.controller';
import { ClienteService } from './services/cliente.service';

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ClienteSchema } from './schema/cliente.schema';

@Module({
  imports: [


    MongooseModule.forFeature([
        // para poder usar o mongoose  111
        {
          name: 'Cliente',
          schema: ClienteSchema ,
        }
      ]),




      
  ],
  controllers: [ClienteController],
  providers: [ClienteService],
})
export class ClienteModule {}
