import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { userOtp } from 'src/otp/entities/otp.entity';
import { Repository, LessThan } from 'typeorm';

@Injectable()
export class OtpCleanerService {
  constructor(@InjectRepository(userOtp) private otpRepo: Repository<userOtp>) {}

  @Cron('0 * * * *') 
  async handleOtpCleanup() {
    const cutoff = new Date(Date.now() - 10 * 60 * 1000); 
    await this.otpRepo.delete({ createdAt: LessThan(cutoff) });
  }
}