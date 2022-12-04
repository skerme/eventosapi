import { Controller, UseGuards, Request, Post } from '@nestjs/common';
import { AuthService } from 'src/usuarios/services/auth.service';
import { LocalAuthGuard } from 'src/usuarios/auth/local-auth.guard';



@Controller()
export class AuthController {

    constructor(
        private authService: AuthService,
      ) { }

  @UseGuards(LocalAuthGuard)    //chama local.strategy.ts   11
  @Post('auth/login')
  async login(@Request() req: any) {
    console.log("444 auth.controller.login", req.user)
     

    return this.authService.createToken(req.user);  
  }
}
