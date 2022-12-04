import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "../services/auth.service";



@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {

  constructor(private authService: AuthService) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    });
  }

  async validate(email: string, password: string): Promise<any> {
    console.log("111 ESSE TRECHO @UseGuards(LocalAuthGuard)    CHAMOU  local.strategy.validate ") 

    console.log("222  local.strategy.validate  xxxxxxxxxx", email, password)
    const user = await this.authService.validateUserPassword(email, password);    

console.log("WWWWWWWWWWWWWWWWWWW", user)


    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
