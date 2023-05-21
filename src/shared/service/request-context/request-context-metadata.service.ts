import { Request } from 'express';

import { RequestContextService } from './request-context.service';

export class RequestContextMetadataService {
  public static set request(request: Request) {
    RequestContextService.set(`METADATA:REQUEST`, request);
  }

  public static get request() {
    return RequestContextService.get(`METADATA:REQUEST`);
  }
}
