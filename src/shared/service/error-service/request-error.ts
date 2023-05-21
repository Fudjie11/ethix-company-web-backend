export interface IRequestErrorItem {
  code?: string | number;
  message: string;

  [key: string]: any;
}

export class RequestError extends Error {
  message: string | any = null;
  errors: IRequestErrorItem[] = [];
  detail?: any;

  buildMessage() {
    if (!this.message) {
      if (this.errors && this.errors.length) {
        if (this.errors.length === 1) {
          this.message = this.formatMessage(this.errors[0]);
        } else if (this.errors.length > 0) {
          this.message = this.errors.map(err => '- ' + this.formatMessage(err)).join(' \n');
        } else {
          this.message = 'Terjadi kesalahan tidak terduga';
        }
      }
    }
  }

  formatMessage(errorItem: IRequestErrorItem) {
    const errorCode = errorItem.code;
    const errorMessage = errorItem.message;

    if (errorCode) {
      return `CODE ${errorCode}: ${errorMessage}`;
    }

    return errorMessage;
  }
}
