import { Entity, Column, OneToMany, OneToOne, JoinColumn } from "typeorm";
import { BaseModel } from "./base.model.entity";
import { Jwt } from "./jwt.entity";
import { Role } from "./role.entity";

@Entity()
export class User extends BaseModel {
  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column({ default: false })
  isBlocked: boolean;

  @Column({ default: false })
  isVerified: boolean;

  @OneToMany(() => Jwt, (jwt) => jwt.user)
  @JoinColumn()
  jwts: Jwt[];

  @OneToOne(() => Role)
  @JoinColumn()
  role: Role;
}
