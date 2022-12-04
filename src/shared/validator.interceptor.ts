import { Observable } from 'rxjs';
import {
  CallHandler,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Contract } from '../produto/contracts/contracts';
import { Result } from 'src/shared/result.model';


@Injectable()
export class ValidatorInterceptor<T> implements NestInterceptor<any,any> {

  constructor(public contract: Contract) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {

    const body = context.switchToHttp().getRequest().body;
    console.log("fdfdf", body)
    const valid = this.contract.validate(body);

    if (!valid) {
      throw new HttpException(
        new Result('Ops, algo saiu errado', false, null, this.contract.errors),
        HttpStatus.BAD_REQUEST);
    }

    return next.handle();
  }
}
