import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "apps/users/src/users.service";

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private userService: UsersService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const tokenHeader = request.headers.authorization?.split(" ")[1];
    const tokenQuery = request.query.authorization;
    const token = tokenHeader || tokenQuery;

    if (!token) {
      throw new UnauthorizedException("token empty");
    }

    const decode = this.jwtService.decode(token);
    request.id = decode["userId"];

    const user = await this.userService.findOneById(decode["userId"]);
    const jwts = await this.userService.findJwt(user.id);

    if (user.isBlocked) {
      return false;
    }

    for (let i = 0; i < jwts.length; i++) {
      if (jwts[i].token === token) {
        return true;
      }
    }
  }
}
