import { Column, Entity, ManyToOne } from 'typeorm';

import { BaseModel } from './base.model.entity';
import { User } from './user.entity';

@Entity()
export class Jwt extends BaseModel {
  @Column()
  token: string;

  @ManyToOne(() => User, (user) => user.jwts)
  user: User;
}
