import { ContinuationLocalStorage } from 'asyncctx';
import { PromiseDeferred } from '../../helper/promise-deferred.helper';

export class AsyncContextService {
  static cls = new ContinuationLocalStorage<AsyncContextService>();

  static initContext(req?: Request, res?: Response) {
    this.currentContext = this.cls.setContext(new AsyncContextService());
  }

  static initContextIfNotExist(req?: Request, res?: Response) {
    const currentContext = this.currentContext;
    if (!currentContext) {
      this.currentContext = this.cls.setContext(new AsyncContextService());
    }
  }

  static get currentContext() {
    return this.cls.getContext();
  }

  static set currentContext(currentContext: AsyncContextService) {
    this.cls.setContext(currentContext);
  }

  static initContextAndWrapAsyncMethod<T = any>(asyncMethod: (...fnArgs) => Promise<T>) {
    return function(...args): PromiseLike<T> {
      AsyncContextService.initContextIfNotExist();
      const promiseDeferred = new PromiseDeferred<T>();
      process.nextTick(() => {
        asyncMethod(...args)
          .then(promiseDeferred.resolve.bind(promiseDeferred))
          .catch(promiseDeferred.reject.bind(promiseDeferred));
      });
      return promiseDeferred.promise;
    };
  }

  static wrapAsyncMethod<T = any>(asyncMethod: (...fnArgs) => Promise<T>) {
    return function(...args): PromiseLike<T> {
      const promiseDeferred = new PromiseDeferred<T>();
      process.nextTick(() => {
        asyncMethod(...args)
          .then(promiseDeferred.resolve.bind(promiseDeferred))
          .catch(promiseDeferred.reject.bind(promiseDeferred));
      });
      return promiseDeferred.promise;
    };
  }

  readonly requestId: number;

  private contextValues: any = {};

  constructor(public readonly req?: Request, public readonly res?: Response) {
    this.requestId = Date.now();
  }

  public get(contextName: string) {
    return this.contextValues[contextName];
  }

  public set(contextName: string, contextValue: any) {
    this.contextValues[contextName] = contextValue;
  }
}
