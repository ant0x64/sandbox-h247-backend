import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

export interface AuthPayload {
  sub: string;
}

@Injectable()
export class AuthService {
  constructor(protected readonly jwtService: JwtService) {}

  verifyToken(token: string): AuthPayload['sub'] | null {
    try {
      const payload = this.jwtService.verify(token);
      return payload.sub;
    } catch {
      return null;
    }
  }

  generateToken(payload: AuthPayload): string {
    return this.jwtService.sign(payload, {
      expiresIn: process.env.TOKEN_EXPIRE_TIME || '60s',
    });
  }
}
