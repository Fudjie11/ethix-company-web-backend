import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { OAuth2Service } from '../services/user-management/login/oauth2.service';

@Injectable()
export class OAuth2Middleware implements NestMiddleware {
  use(req: Request, res: Response, next: Function) {
    OAuth2Service.authenticateRequest(req, res, next);
  }
}
