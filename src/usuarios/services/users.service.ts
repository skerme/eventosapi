
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { User } from 'src/usuarios/model/user.model';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) { }

  async getAll(email: string) {

 console.log("RRRRRRRRRRRRRRRRRRRRRR", email)

    return await this.userModel.findOne({email: email, estado:1}).exec();
  }

  async getById(id: string) {
    return await this.userModel.findById(id).exec();
  }


  
  async getByEstado(estado: number):Promise<any> {
    return await this.userModel.find({estado:estado}).exec();
  }


  
  async getByEmail(email: string) {
    return await this.userModel.findOne({ email:email ,  estado:1 }).exec();
  }
  

  async create(user: User) {

    
    const createdUser = new this.userModel(user);
    return await createdUser.save();
  }

  async update(id: string, user: User) {
    
    await this.userModel.findOneAndUpdate({ _id: id }, user).exec();
    return this.getById(id);
  }

  async delete(id: string) {
    await this.userModel.deleteOne({ _id: id }).exec();
    return id;
  }

}
