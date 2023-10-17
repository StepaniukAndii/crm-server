import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsEmail, IsNotEmpty, IsString } from "class-validator";

export class StudentDeleteDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  @IsEmail()
  email: string;
}
