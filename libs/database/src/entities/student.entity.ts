import { Column, Entity, Unique } from "typeorm";
import { BaseModel } from "./base.model.entity";

@Entity()
export class Students extends BaseModel {
  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  office: string;

  @Column()
  mentor: string;

  @Column()
  signed_up: string;

  study_time: number;
}
