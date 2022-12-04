import { CompraController } from './controllers/compra.controller';

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../usuarios/auth/constants';
import { ProdutoModule } from '../produto/produto.module';
import { CompraSchema } from './schema/compra.schema';
import { CompraService } from './services/compra.service';






@Module({
    imports: [
         MongooseModule.forFeature([
            // para poder usar o mongoose  111
            {
                name: 'Compra',
                schema: CompraSchema,
            }
        ]),


        PassportModule,
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '6000s' },
        }),



    ],
    controllers: [CompraController],
    providers: [CompraService],




})
export class CompraModule { }
