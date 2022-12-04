
import { Controller, Get, Param, Body, Post, Put, Delete } from '@nestjs/common';
import { Md5 } from 'md5-typescript';
import { User } from 'src/usuarios/model/user.model';
import { UsersService } from 'src/usuarios/services/users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}
//@UseGuards(JwtAuthGuard)



  @Get('usuario/:email')
  async getAll(@Param('email') email: string): Promise<User> {




    return this.usersService.getAll(email);
  }
//@UseGuards(JwtAuthGuard)
  @Get(':id')
  async getById(@Param('id') id: string): Promise<User> {
    return this.usersService.getById(id);
  }


  @Get('estado/:estado')
  async findAtivos(@Param('estado') estado: number):  Promise<User> {
console.log("estado", estado)

    return await this.usersService.getByEstado(estado)
  }





//@UseGuards(JwtAuthGuard)
  @Get('email/:email')
  async getByEmail(@Param('email') email: string): Promise<User> {
    return this.usersService.getByEmail(email);
  }

//@UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() user: User): Promise<User> {

    user.password= await Md5.init(`${user.password}${process.env.SALT_KEY}`)


    return this.usersService.create(user);
  }
//@UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(@Param('id') id: string, @Body() user: User): Promise<User> {
    return this.usersService.update(id, user);
  }


//@UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id:string){
    await this.usersService.delete(id);
    return "produto deletado"
  }


}
