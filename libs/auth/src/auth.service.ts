import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "apps/users/src/users.service";

import { SignInDto } from "../../../apps/dto/sign.in.dto";
import { SignUpDto } from "../../../apps/dto/sign.up.dto";
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async login(credentials: SignInDto): Promise<any> {
    await this.checkVereficationUser(credentials);
    const token = await this.generateJwtToken(credentials);

    return {
      access_token: token,
    };
  }

  async register(user: SignUpDto): Promise<any> {
    if (user.password !== user.confirm_password) {
      throw new BadRequestException("Passwords are not the same");
    }

    const hashpassword = await bcrypt.hash(user.password, 5);
    await this.usersService
      .create({
        ...user,
        password: hashpassword,
      })
      .catch((e) => {
        console.log(e.detail);
        if (/(already exists)/.test(e.detail)) {
          throw new BadRequestException(
            "Account with this email already exists."
          );
        }
      });

    return {
      message: ["User registration successfully"],
    };
  }

  async generateJwtToken(credentials: SignInDto) {
    const user = await this.usersService.findOne(credentials.username);
    const payload = {
      userId: user.id,
    };

    const acsess_token = this.jwtService.sign(payload);
    await this.usersService.addJwt(user.id, acsess_token);

    return acsess_token;
  }

  async checkVereficationUser(credentials: SignInDto) {
    const user = await this.usersService.findOne(credentials.username);
    if (!user) {
      throw new HttpException(
        {
          error: "User",
          message: `User not found`,
        },
        HttpStatus.NOT_FOUND
      );
    }

    const validPass = await bcrypt.compare(credentials.password, user.password);

    if (validPass === false) {
      throw new NotFoundException(`User doesn't exists`);
    }

    if (user.isVerified) {
      throw new HttpException(
        {
          error: "User",
          message: `User is not verified`,
        },
        HttpStatus.PRECONDITION_FAILED
      );
    }
  }
}
