

import { Module } from '@nestjs/common';
import { VendaController } from './controllers/venda.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { VendaSchema } from './schema/venda.schema';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../usuarios/auth/constants';
import { VendaService } from './services/venda.service';
import { ProdutoModule } from '../produto/produto.module';

@Module({
    imports: [
      ProdutoModule,      
        MongooseModule.forFeature([
            // para poder usar o mongoose  111
            {
              name: 'Venda',
              schema: VendaSchema,
            }
          ]),
    
    
          PassportModule,
          JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '6000s' },
          }),
    
  
          
    ],
    controllers: [VendaController],
    providers: [VendaService],
    exports:[VendaService]                              // insiro aqui para poder usar no modulo da estatistica
})
export class VendaModule {}
