import { Injectable, NestMiddleware } from '@nestjs/common';
import { AsyncContextService } from '../service/request-context/async-context.service';

@Injectable()
export class RequestContextMiddleware implements NestMiddleware {
  use = (req: Request, res: Response, next: () => void) => {
    this.middlewareHandler(req, res, next);
  };

  public static get rawExpressMiddleware() {
    return new RequestContextMiddleware().use;
  }

  private middlewareHandler(req: Request, res: Response, next: () => void) {
    AsyncContextService.currentContext = new AsyncContextService(req, res);

    next();
  }
}
