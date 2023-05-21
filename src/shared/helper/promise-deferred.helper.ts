/**
 * @see https://github.com/domenic/promises-unwrapping/blob/master/docs/states-and-fates.md
 */
export class PromiseDeferred<T = any> {
  public promise: Promise<T>;

  private fate: 'resolved' | 'unresolved';
  private state: 'pending' | 'fulfilled' | 'rejected';

  // tslint:disable-next-line:variable-name
  private _resolve: Function;
  // tslint:disable-next-line:variable-name
  private _reject: Function;

  constructor() {
    this.state = 'pending';
    this.fate = 'unresolved';
    this.promise = new Promise((resolve, reject) => {
      this._resolve = resolve;
      this._reject = reject;
    });
    this.promise.then(
      () => this.state = 'fulfilled',
      () => this.state = 'rejected',
    );
  }

  resolve(value?: any) {
    if (this.fate === 'resolved') {
      throw new Error('Deferred cannot be resolved twice');
    }
    this.fate = 'resolved';
    this._resolve(value);
  }

  reject(reason?: any) {
    if (this.fate === 'resolved') {
      throw new Error('Deferred cannot be resolved twice');
    }
    this.fate = 'resolved';
    this._reject(reason);
  }

  isResolved() {
    return this.fate === 'resolved';
  }

  isPending() {
    return this.state === 'pending';
  }

  isFulfilled() {
    return this.state === 'fulfilled';
  }

  isRejected() {
    return this.state === 'rejected';
  }
}
