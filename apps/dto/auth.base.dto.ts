import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class BaseAuth {
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
}
