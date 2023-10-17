import { Column, Entity } from "typeorm";

import { BaseModel } from "./base.model.entity";

@Entity()
export class Role extends BaseModel {
  @Column()
  name: string;
}
