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

  @Column({ type: "date" })
  signed_up: Date;

  @Column({ default: 0 })
  study_time: number;
}
