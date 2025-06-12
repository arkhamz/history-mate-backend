import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/modules/users/users.service';
import { AuthInput, AuthResult, SignInData } from './authTypes';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { RegisterRequestDto } from './dtos/registerRequestDto';

@Injectable()
export class AuthService {
  //inject usersService so that we can use it
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async authenticate(input: AuthInput): Promise<AuthResult> {
    //validate user
    const user = await this.validateUser(input);
    if (!user) {
      throw new UnauthorizedException();
    }

    //generate jwt - verification token signed with secret key so server can validate

    return await this.generateJwt(user);
  }

  //Gets db user and valiates password
  async validateUser(input: AuthInput): Promise<SignInData | null> {
    const user = await this.usersService.findUser(input.username);

    if (!user) {
      throw new InternalServerErrorException();
    }

    //bcrypt to compare password
    const passwordIsValid = await compare(input.password, user.password);

    if (passwordIsValid) {
      return {
        userId: user?.id,
        username: user?.username,
      };
    }

    return null;
  }

  //generates signed jwt access token for client use
  async generateJwt(user: SignInData): Promise<AuthResult> {
    const accessTokenPayload = {
      sub: user.userId, //sub=subject
      username: user.username,
    };

    //generate signed jwt access token
    const accessToken = await this.jwtService.signAsync(accessTokenPayload);
    return { accessToken, username: user.username, userId: user.userId };
  }

  async register(user: RegisterRequestDto): Promise<AuthResult> {
    const existingUser = await this.usersService.findUser(user.username);
    if (existingUser) {
      throw new BadRequestException('User already exists');
    }
    const createdUser = await this.usersService.createUser({
      username: user.username,
      password: user.password,
    });
    const accessToken = await this.generateJwt({
      userId: createdUser.id,
      username: createdUser.username,
    });
    return accessToken;
  }
}
