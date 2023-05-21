import Axios from 'axios';

import { HttpClientAxiosService } from './http-client-axios.service';

export class HttpClientService extends HttpClientAxiosService {
  constructor(baseURL: string) {
    super(Axios.create());
    this.axios.defaults.baseURL = baseURL;
    this.axios.defaults.timeout = 3 * 60 * 1000;
  }
}
