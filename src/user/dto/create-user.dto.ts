import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'Ram', description: 'The name of the user' })
  @IsString()
  @IsNotEmpty()
  userName: string

  @ApiProperty({ example: 'dmnf@gmail.com', description: 'The email address of the user' })
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'df', description: 'The password of the user' })
  @IsString()
  @IsNotEmpty()
  password: string;
}
