import { JwtPayload } from './../auth/jwt-payload.interface';

import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Md5 } from 'md5-typescript';
import { UsersService } from './users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUserPassword(userEmail: string, userPassword: string) {

    console.log("333 auth.service.validateUserPassword", userEmail, userPassword)

    const user = await this.usersService.getByEmail(userEmail);
    
    userPassword= await Md5.init(`${userPassword}${process.env.SALT_KEY}`)
   
    console.log("333xxxxxxxxxxxxxxxxxxxxxxxxxxxx",  userPassword)

    if (user && user.password === userPassword) {
      const { _id, name, email, perfil } = user;
      return { id: _id, name, email, perfil };
    }

    return null;
  }

  async createToken(payload: JwtPayload) {                                      
    console.log("444 auth.service.login")
    return {
      access_token: this.jwtService.sign(payload),                //retorna p token   
    };
  }
}
