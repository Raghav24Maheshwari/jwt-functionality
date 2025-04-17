import { Module } from '@nestjs/common';
import { OtpService } from './otp.service';
import { OtpController } from './otp.controller';
import { userOtp } from './entities/otp.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([userOtp,User])],
  controllers: [OtpController],
  exports: [OtpService],
  providers: [OtpService],
})
export class OtpModule {}
