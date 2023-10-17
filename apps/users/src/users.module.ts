import { Module } from "@nestjs/common";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "@app/database/entities/user.entity";
import { JwtService } from "@nestjs/jwt";
import { Jwt } from "../../../libs/database/src/entities/jwt.entity";
import { AuthModule } from "@app/auth";

@Module({
  imports: [TypeOrmModule.forFeature([User, Jwt])],
  controllers: [UsersController],
  providers: [UsersService, JwtService],
  exports: [UsersService],
})
export class UsersModule {}
