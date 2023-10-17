import { Body, Controller, Get, HttpCode, Put } from "@nestjs/common";
import { UsersService } from "./users.service";
import { SignUpDto } from "apps/dto/sign.up.dto";
import { PassDto } from "apps/dto/pass.dto";

@Controller("api/v1/user")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Put("password")
  @HttpCode(200)
  async updatePassword(@Body() passDto: PassDto) {
    return this.usersService.updatePassword(passDto);
  }
}
