import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsEmail, IsNotEmpty, IsString } from "class-validator";

export class StudentDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  office: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  mentor: string;

  @IsNotEmpty()
  @ApiProperty()
  signed_up: string;
}
