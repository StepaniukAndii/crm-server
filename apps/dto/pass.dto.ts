import { ApiProperty } from "@nestjs/swagger";
import { BaseAuth } from "./auth.base.dto";
import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class PassDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(32)
  @ApiProperty()
  username: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(32)
  @ApiProperty()
  password: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(32)
  @ApiProperty()
  new_password: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(32)
  @ApiProperty()
  confirm_new_password: string;
}
