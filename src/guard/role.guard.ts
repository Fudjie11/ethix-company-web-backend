import {
  CanActivate,
  ExecutionContext,
  mixin,
  UnauthorizedException
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtConstant } from './jwt-constant';

export const RoleGuard = (permission: string) => {
  class RoleGuardMixing implements CanActivate {
    async canActivate(context: ExecutionContext): Promise<boolean> {
      const request = context.switchToHttp().getRequest();
      const jwtService = new JwtService(jwtConstant);

      const authorization = request.headers['authorization'];
      if (!authorization) {
        throw new UnauthorizedException();
      }
      const token = authorization.split(' ')[1];
      const dcoded = jwtService.decode(token);
      try {
        return dcoded['permissions'].includes(permission);
      } catch {
        throw new UnauthorizedException();
      }
    }
  }

  const guard = mixin(RoleGuardMixing);
  return guard;
};
