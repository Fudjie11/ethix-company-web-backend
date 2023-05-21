import { JsonStringifySimpleService } from './json-stringify-simple.service';

export class ContextualError {
  errors: ContextualErrorItem[] = [];

  addError(...errors: ContextualErrorItem[]) {
    this.errors.push(...errors);
  }
}

export class ContextualErrorItem extends Error {
  message: string = null;
  code: string | number = '';
  data: any = null;

  parseError(err: any) {
    this.data = err;

    this.parseErrorCode(err);
    this.parseErrorMesssage(err);
  }

  parseErrorCode(err: any) {
    if (err.code) {
      this.code = err.code;
    }
  }

  parseErrorMesssage(err: any) {
    // tslint:disable-next-line: prefer-conditional-expression
    if (err.message) {
      this.message = err.message;
    } else {
      this.message = JsonStringifySimpleService.stringify(err);
    }
  }
}
