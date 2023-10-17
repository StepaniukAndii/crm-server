import { User } from "@app/database/entities/user.entity";
import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { PassDto } from "apps/dto/pass.dto";
import { SignUpDto } from "apps/dto/sign.up.dto";
import * as bcrypt from "bcrypt";
import { Repository } from "typeorm";

import { Jwt } from "../../../libs/database/src/entities/jwt.entity";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Jwt)
    private jwtRepository: Repository<Jwt>
  ) {}

  async findOne(username: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { username } });
  }

  async findOneById(id: number): Promise<User> {
    return await this.userRepository.findOne({ where: { id } });
  }

  async findJwt(id: number): Promise<Jwt[]> {
    return await this.jwtRepository
      .createQueryBuilder("jwt")
      .leftJoinAndSelect("jwt.user", "user")
      .where("user.id = :userId", { userId: id })
      .getMany();
  }

  async create(user: SignUpDto): Promise<User> {
    return this.userRepository.save(user);
  }

  async addJwt(id: number, token: string) {
    const user = await this.userRepository.findOne({ where: { id } });
    const newJwt = new Jwt();
    newJwt.token = token;
    newJwt.user = user;

    return await this.jwtRepository.save(newJwt);
  }

  async blockUser(username: string) {
    const user = await this.findOne(username);

    return await this.userRepository.update(user.id, { isBlocked: true });
  }

  async updatePassword(user: PassDto): Promise<any> {
    if (user.confirm_new_password !== user.new_password) {
      throw new BadRequestException("Password not same");
    }

    const username = user.username;
    const userbd = await this.userRepository.findOne({ where: { username } });
    if (!user) {
      throw new HttpException(
        {
          error: "User",
          message: `User not found`,
        },
        HttpStatus.NOT_FOUND
      );
    }

    const validPass = await bcrypt.compare(user.password, userbd.password);

    if (validPass === false) {
      throw new NotFoundException(`User doesn't exists`);
    }

    const hashpassword = await bcrypt.hash(user.new_password, 5);
    const userBd = await this.findOne(user.username);
    await this.userRepository.update(userBd.id, {
      password: hashpassword,
    });

    return {
      message: "Password update",
    };
  }
}
