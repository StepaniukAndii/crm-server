import { Body, Controller, HttpCode, Post, Redirect } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { SignInDto } from "../../../apps/dto/sign.in.dto";
import { SignUpDto } from "../../../apps/dto/sign.up.dto";

@Controller("api/v1")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("sign-up")
  @HttpCode(201)
  async signUp(@Body() registerDto: SignUpDto) {
    return this.authService.register(registerDto);
  }

  @Post("sign-in")
  @HttpCode(200)
  async signIn(@Body() loginDto: SignInDto) {
    return this.authService.login(loginDto);
  }
}
