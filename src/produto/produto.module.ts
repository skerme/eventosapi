import { VendaModule } from './../venda/venda.module';

import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { MongooseModule } from "@nestjs/mongoose";
import { PassportModule } from "@nestjs/passport";
import { jwtConstants } from "src/usuarios/auth/constants";
import { JwtStrategy } from "src/usuarios/auth/jwt.strategy";
import { LocalAuthGuard } from "src/usuarios/auth/local-auth.guard";
import { LocalStrategy } from "src/usuarios/auth/local.strategy";
import { AuthController } from "src/usuarios/controllers/auth.controller";
import { ProdutoController } from "src/produto/controllers/produto.controller";
import { UsersController } from "src/usuarios/controllers/user.controller";
import { HistoricoProdutoSchema, ProdutoSchema } from "src/produto/Schema/produto.schema";
import { UserSchema } from "src/usuarios/schema/user.schema";
import { AuthService } from "src/usuarios/services/auth.service";
import { ProdutoService } from "src/produto/services/produto.service";
import { UsersService } from "src/usuarios/services/users.service";



@Module({


    imports: [ 
         
      MongooseModule.forFeature([
        // para poder usar o mongoose  111
        {
          name: 'Produto',
          schema: ProdutoSchema,
        },
        {
          name: 'User',
          schema: UserSchema,
        },
        {
          name: 'HistoricoProduto',
          schema: HistoricoProdutoSchema,
        },
      ]),


      PassportModule,
      JwtModule.register({
        secret: jwtConstants.secret,
        signOptions: { expiresIn: '6000s' },
      }),

     

    ],
    controllers: [
        AuthController,
        // AppController,
        ProdutoController,
        UsersController,
        
    ],
    providers: [
        UsersService,
        ProdutoService,
        AuthService,
        // AppService,
    
        LocalStrategy,
        LocalAuthGuard,
        JwtStrategy,
        
    ],

    exports:[ProdutoService]
    
})
export class ProdutoModule {}
