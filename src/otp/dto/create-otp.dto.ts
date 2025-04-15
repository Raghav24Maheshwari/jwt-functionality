import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateOtpDto {
  @ApiProperty({ example: 'user123', description: 'The ID of the user' })
  @IsNumber()
  @IsNotEmpty()
  userId: number

  @ApiProperty({ example: 'dmnf@gmail.com', description: 'The email address of the user' })
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'df', description: 'The username of the user' })
  @IsString()
  @IsNotEmpty()
  username: string;
}
