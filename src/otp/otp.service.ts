import { Injectable, HttpStatus } from "@nestjs/common";
import { otpGenerator, otpSend } from "src/utils/helper";
import { OTP_EXPIRY_TIME } from "src/utils/constants";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { userOtp } from "./entities/otp.entity";
@Injectable()
export class OtpService {
  constructor(
    @InjectRepository(userOtp)
    private readonly userOtpRepository: Repository<userOtp>,
  ) {}


  async generateOtp(userId: number,email:string,username:string) {
    const otp = otpGenerator();
    const timestamp = Date.now();
    const otpData = this.userOtpRepository.create({
      userId,
      otp,
      email,
      username,
      timestamp,
    });
    await this.userOtpRepository.save(otpData);
    await otpSend(email,otp)
    return {
      statusCode: HttpStatus.CREATED,
      message: 'OTP generated successfully',
    };
  }
  async verifyOtp(userId: number, otp: string) {
    const userEntry = await this.userOtpRepository.findOne({ where: { userId } });

    if (!userEntry) {
      return { statusCode: HttpStatus.NOT_FOUND, message: 'User ID not found' };
    }

    if (userEntry.otp !== otp) {
      return { statusCode: HttpStatus.NOT_FOUND, message: 'otp not found' };
    }

    const currentTime = Date.now();
    const timeDiff = currentTime - userEntry.timestamp;

    if (timeDiff > OTP_EXPIRY_TIME) {
      return { statusCode: HttpStatus.GONE, message: 'OTP Expired' }; 
    }

    return {
      statusCode: HttpStatus.OK,
      message: "OTP Verified",
    };
  }
}
