import { omit } from 'lodash';
import { RequestError } from './request-error';

export class RequestErrorGoCompatibility extends RequestError {
  buildMessage() {
    super.buildMessage();

    this.errors = this.errors.map(err => ({
      error_code: err.code,
      error_message: err.message,
      detail: {
        errorClass: err.constructor.name,
        ...omit(err, ['code', 'message']),
      },
    })) as any;
  }
}
