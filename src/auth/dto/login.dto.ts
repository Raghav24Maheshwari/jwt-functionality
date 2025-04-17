import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString } from "class-validator";

export class LoginDto {
    @ApiProperty({ example: 'yourmail@gmail.com', description: 'The email address of the user' })
    @IsEmail()
    email: string;
  
    @ApiProperty({ example: 'df@123', description: 'The password of the user' })
    @IsString()
    password: string;
  }
  