import { Students } from "@app/database/entities/student.entity";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersService } from "apps/users/src/users.service";

import { StudentsController } from "./students.controller";
import { StudentsService } from "./students.service";
import { UsersModule } from "apps/users/src/users.module";
import { JwtService } from "@nestjs/jwt";

@Module({
  imports: [TypeOrmModule.forFeature([Students]), UsersModule],
  controllers: [StudentsController],
  providers: [StudentsService, JwtService],
  exports: [StudentsService],
})
export class StudentsModule {}
