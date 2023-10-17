import { TypeOrmModuleOptions } from "@nestjs/typeorm";

import { User } from "./entities/user.entity";
import { Jwt } from "./entities/jwt.entity";
import { Role } from "./entities/role.entity";
import { Students } from "./entities/student.entity";
export const databaseConfig: TypeOrmModuleOptions = {
  type: "postgres",
  host: "postgres",
  port: 5432,
  username: "postgres",
  password: "postgres",
  database: "testapp",
  entities: [__dirname + "/../**/*.entity{.ts,.js}", User, Jwt, Role, Students],
  synchronize: true,
};
