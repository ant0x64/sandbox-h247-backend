import {
  Catch,
  HttpException,
  ArgumentsHost,
  ExceptionFilter,
  HttpExceptionBody,
  HttpStatus,
  Injectable,
} from '@nestjs/common';

import { ServerResponse } from 'node:http';

@Catch()
@Injectable()
export class AppExceptionFilter implements ExceptionFilter<HttpException> {
  catch(exception: Error | undefined, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<ServerResponse>();

    const responseBody =
      exception && exception['response']
        ? exception['response']
        : ({
            error: '[App Exception Filter] Internal Server Error',
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          } as HttpExceptionBody);

    console.error(exception.message);

    response.statusCode =
      (exception && exception['status']) || HttpStatus.INTERNAL_SERVER_ERROR;

    response.setHeader('Content-Type', 'text/json');
    response.write(JSON.stringify(responseBody));

    response.end();
  }
}
