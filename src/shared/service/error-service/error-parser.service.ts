import { ArgumentsHost } from '@nestjs/common';
import { ValidationError } from 'class-validator';
import { forEach, isArray, isString } from 'lodash';

import { IRequestErrorItem, RequestError } from './request-error';
import { RequestErrorGoCompatibility } from './request-error-go-compatibility';

export class ErrorParserService {
  public static parseRequestErrorFromExceptionAndArgumentsHost(
    exception: any,
    host: ArgumentsHost,
  ) {
    let requestError: RequestError;
    requestError = new RequestError();
    requestError.detail = exception;
    requestError.errors = this.populateErrorItems(exception);
    requestError.buildMessage();

    return requestError;
  }

  private static populateErrorItems(
    errorContent,
    errorMessages: IRequestErrorItem[] = [],
  ) {
    if (errorContent) {
      if (
        errorContent &&
        errorContent.message &&
        !isString(errorContent.message)
      ) {
        this.populateErrorItems(errorContent.message, errorMessages);
      }

      if (isArray(errorContent)) {
        for (const errorItem of errorContent) {
          this.populateErrorItems(errorItem, errorMessages);
        }
      } else if (isString(errorContent.message) || isString(errorContent.code)) {
        errorMessages.push(errorContent);
      } else {
        switch (true) {
          case typeof errorContent !== 'function' &&
            typeof errorContent !== 'object':
            errorMessages.push({ message: errorContent });
            break;
          case errorContent instanceof ValidationError:
            forEach(errorContent.constraints, errorConstraint => {
              errorMessages.push({ message: errorConstraint });
            });
            break;
        }
      }
    }

    return errorMessages;
  }
}
