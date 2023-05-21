import Axios, {
  AxiosInstance,
  AxiosPromise,
  AxiosRequestConfig,
  CancelTokenStatic,
} from 'axios';
import { Observable } from 'rxjs';

export class HttpClientAxiosService {
  private cancelToken: CancelTokenStatic = Axios.CancelToken;

  constructor(public axios: AxiosInstance) {}

  public setBasicAuth(username: string, password: string) {
    this.axios.defaults.auth = {
      username,
      password,
    };
  }

  public patch<T = any, TPayload = any>(
    url = '',
    data?: TPayload,
    config: AxiosRequestConfig = {},
  ): Observable<T> {
    return new Observable((observer) => {
      const axiosCancel = this.cancelToken.source();
      config.cancelToken = axiosCancel.token;

      (this.axios.patch(url, data, config) as AxiosPromise)
        .catch((error) => observer.error(error))
        .then((response) => {
          observer.next(response && response.data);
          observer.complete();
        });

      return () => {
        axiosCancel.cancel();
      };
    });
  }

  public post<T = any, TPayload = any>(
    url = '',
    data?: TPayload,
    config: AxiosRequestConfig = {},
  ): Observable<T> {
    return new Observable((observer) => {
      const axiosCancel = this.cancelToken.source();
      config.cancelToken = axiosCancel.token;
      console.log("URL : ",url);
      (this.axios.post(url, data, config) as AxiosPromise)
        .catch((error) => {
          observer.error(error)
        })
        .then((response) => {
          observer.next(response && response.data);
          observer.complete();
        });

      return () => {
        axiosCancel.cancel();
      };
    });
  }

  public put<T = any, TPayload = any>(
    url = '',
    data?: TPayload,
    config: AxiosRequestConfig = {},
  ): Observable<T> {
    return new Observable((observer) => {
      const axiosCancel = this.cancelToken.source();
      config.cancelToken = axiosCancel.token;

      (this.axios.put(url, data, config) as AxiosPromise)
        .catch((error) => observer.error(error))
        .then((response) => {
          observer.next(response && response.data);
          observer.complete();
        });

      return () => {
        axiosCancel.cancel();
      };
    });
  }

  public get<T = any>(
    url = '',
    config: AxiosRequestConfig = {},
  ): Observable<T> {
    return new Observable((observer) => {
      const axiosCancel = this.cancelToken.source();
      config.cancelToken = axiosCancel.token;

      (this.axios.get(url, config) as AxiosPromise)
        .catch((error) => observer.error(error))
        .then((response) => {
          observer.next(response && response.data);
          observer.complete();
        });

      return () => {
        axiosCancel.cancel();
      };
    });
  }

  public delete<T = any>(
    url = '',
    config: AxiosRequestConfig = {},
  ): Observable<T> {
    return new Observable((observer) => {
      const axiosCancel = this.cancelToken.source();
      config.cancelToken = axiosCancel.token;

      (this.axios.delete(url, config) as AxiosPromise)
        .catch((error) => observer.error(error))
        .then((response) => {
          observer.next(response && response.data);
          observer.complete();
        });

      return () => {
        axiosCancel.cancel();
      };
    });
  }
}
