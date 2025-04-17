import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsString } from "class-validator";

export class verifyOtpDto {
  @ApiProperty({ example: "user123", description: "The ID of the user" })
  @IsInt({ message: "userId must be an integer" })
  userId: number;

  @ApiProperty({ example: "123456", description: "The OTP code" })
  @IsString({ message: "otp must be a string" })
  otp: string;
}
