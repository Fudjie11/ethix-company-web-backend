import { ConfigService } from '../config/config.service';
import { HttpClientService } from '../htpp-client.service';

export class SendgridAuthService {
  url: string;

  httpClient: HttpClientService;

  constructor() {
    this.init(this.url);
  }

  init(url: string) {
    this.url = url;
    const baseUrl = this.url;
    this.httpClient.axios.defaults.baseURL = baseUrl;
    this.httpClient.axios.interceptors.request.use(config => {
      const headers = config.headers || {};
      config.headers = headers;
      return config;
    });
  }

  initByRequest() {
    const url = ConfigService.get('sendgrid.baseUrl');
    console.log(url);
    this.init(url);
  }
}
