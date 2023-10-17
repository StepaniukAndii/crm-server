import { AuthModule } from "@app/auth";
import { databaseConfig } from "@app/database/database.config";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersModule } from "apps/users/src/users.module";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { StudentsModule } from "apps/students/src/students.module";

@Module({
  imports: [
    TypeOrmModule.forRoot(databaseConfig),
    AuthModule,
    UsersModule,
    StudentsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
