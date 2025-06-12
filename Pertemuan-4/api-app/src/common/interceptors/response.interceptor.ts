import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const uuid = 'uuidv4';

    return next.handle().pipe(
      map((data) => ({
        status: true,
        message: 'Request processed successfully',
        data,
        meta: { uuid, size_response: '500MB', time_response: '10s' },
      })),
    );
  }
}
