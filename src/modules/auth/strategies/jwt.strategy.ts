import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        ExtractJwt.fromAuthHeaderAsBearerToken(),
        JwtStrategy.extractJWTFromCookies,
      ]),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  private static extractJWTFromCookies(req: Request): string | null {
    if (req.cookies && req.cookies['accessToken']) {
      return req.cookies['accessToken'];
    }
    return null;
  }

  //takes the payload of the jwt token as parameter
  async validate(payload: { sub: string; username: string }) {
    return { userId: payload.sub, username: payload.username };
  }
}
