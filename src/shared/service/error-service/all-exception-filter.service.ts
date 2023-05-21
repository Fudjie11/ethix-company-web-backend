import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';

import { ErrorParserService } from './error-parser.service';
import { Response } from 'express';
import { JsonStringifySimpleService } from './json-stringify-simple.service';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    // tslint:disable-next-line:no-console
    console.error(exception);

    const ctx = host.switchToHttp();
    const response: Response = ctx.getResponse();
    const request = ctx.getRequest();

    if (request && response) {
      let status = HttpStatus.INTERNAL_SERVER_ERROR;
      if (exception instanceof HttpException) {
        const exceptionStatus = exception.getStatus();
        if (exceptionStatus) {
          status = exceptionStatus;
        }
      }

      if (status === 404 || status === '404') {
        response.status(status).send();
      } else {
        const requestErrorResponse = ErrorParserService.parseRequestErrorFromExceptionAndArgumentsHost(
          exception,
          host,
        );
        const jsonResponse = JsonStringifySimpleService.stringify(requestErrorResponse);
        response.header('Content-Type', 'application/json').status(status).end(jsonResponse);
      }
    }
  }
}
