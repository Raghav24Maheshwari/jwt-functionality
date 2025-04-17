import { Injectable, HttpStatus, NotFoundException } from "@nestjs/common";
import { otpGenerator, otpSend } from "src/utils/helper";
import { OTP_EXPIRY_TIME } from "src/utils/constants";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { userOtp } from "./entities/otp.entity";
import { User } from "src/user/entities/user.entity";
@Injectable()
export class OtpService {
  constructor(
    @InjectRepository(userOtp)
    private readonly userOtpRepository: Repository<userOtp>,
     @InjectRepository(User)
          private userRepo: Repository<User>
  ) {}

  async generateOtp(user: User) {
    const otp = otpGenerator();
    const otpData = this.userOtpRepository.create({
      otp,
      user
    });
    await this.userOtpRepository.save(otpData);
    await otpSend(user.email, otp);
    return {
      statusCode: HttpStatus.CREATED,
      message: "OTP generated successfully",
    };
  }
  async verifyOtp(userId: number, otp: string) {
    const userEntry = await this.userOtpRepository.findOne({
      where: { userId },
    });

    if (!userEntry) {
      return { statusCode: HttpStatus.NOT_FOUND, message: "User ID not found" };
    }

    if (userEntry.otp !== otp) {
      return { statusCode: HttpStatus.NOT_FOUND, message: "otp not found" };
    }

    const currentTime = Date.now();
    const timeDiff = currentTime - userEntry.createdAt.getTime();

    if (timeDiff > OTP_EXPIRY_TIME) {
      return { statusCode: HttpStatus.GONE, message: "OTP Expired" };
    }

    return {
      statusCode: HttpStatus.OK,
      message: "OTP Verified",
    };
  }

  async findAll() {
    return this.userOtpRepository.find({ relations:['user'] });
  }
}
