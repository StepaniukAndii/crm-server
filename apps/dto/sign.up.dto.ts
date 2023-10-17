import { ApiProperty } from "@nestjs/swagger";
import { BaseAuth } from "./auth.base.dto";
import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class SignUpDto extends BaseAuth {
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(32)
  @ApiProperty()
  confirm_password: string;
}
