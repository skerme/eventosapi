import { Injectable } from '@nestjs/common';
import { QueryDto } from 'src/produto/dto/query-produto.dto';
import { Flunt } from 'src/shared/flunt';
import { Contract } from './contracts';


@Injectable()
export class QueryContract implements Contract {
  errors: any[];

  validate(model: QueryDto): boolean {
    const flunt = new Flunt();

    if (!model.query)
    model.query={}
    
    flunt.isGreaterThan(model.take,1000, 'Sua query nao pode retornar mais de 1000 registros');


    this.errors = flunt.errors;
    return flunt.isValid();
  }
}
