import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { RequestContextMetadataService } from '../service/request-context/request-context-metadata.service';

@Injectable()
export class RequestContextMetadataMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: Function) {
    this.bindRequest(req);
    next();
  }

  bindRequest(req: Request) {
    RequestContextMetadataService.request = req;
  }
}
