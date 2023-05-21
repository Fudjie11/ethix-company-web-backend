import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class RequestIdMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    const requestId = req.headers['x-request-id'] || uuidv4();
    (req as any).id = requestId;

    res.setHeader('X-Request-ID', requestId);

    if (req.headers['x-correlation-id']) {
      const correlationId = req.headers['x-correlation-id'];
      (req as any).correlationId = correlationId;
      res.setHeader('X-Correlation-ID', correlationId);
    }

    next();
  }
}
