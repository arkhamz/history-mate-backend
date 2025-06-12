import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  //inject jwt service
  constructor(private jwtService: JwtService) {}
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    //get jwt access token from header (sent by client)
    const authorization = request.headers.authorization; // 'Bearer <token>'
    //get token from header
    const token = authorization?.split(' ')[1];
    if (!token) {
      //reject with 401
      throw new UnauthorizedException();
    }
    try {
      //verify async continues on if true, throws error if false
      const tokenPayload = await this.jwtService.verifyAsync(token);
      //add user to the request
      //sub & username used to sign the jwt during generation
      request.user = {
        userId: tokenPayload.sub,
        username: tokenPayload.username,
      };
      return true;
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}
