import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { AuthService } from './auth.service';

import { IncomingMessage } from 'node:http';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(protected authService: AuthService) {}

  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<IncomingMessage>();
    const token = this.extractToken(request);

    if (!token || !this.authService.verifyToken(token)) {
      throw new UnauthorizedException();
    }

    return true;
  }

  private extractToken(request: IncomingMessage): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
