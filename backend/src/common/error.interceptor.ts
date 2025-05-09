// src/common/error.interceptor.ts
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError(error => {
        const status =
          error instanceof HttpException
            ? error.getStatus()
            : HttpStatus.INTERNAL_SERVER_ERROR;

        const originalResponse =
          error instanceof HttpException ? error.getResponse() : null;
        let message: string;
        if (
          originalResponse &&
          typeof originalResponse === 'object' &&
          (originalResponse as any).message
        ) {
          const m = (originalResponse as any).message;
          message = Array.isArray(m) ? m[0] : String(m);
        } else {
          message = error.message || 'Internal Server Error';
        }

        const payload = {
          statusCode: status,
          message,
          timestamp: new Date().toISOString(),
        };

        return throwError(
          () => new HttpException(payload, status),
        );
      }),
    );
  }
}
