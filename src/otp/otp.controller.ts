import { Controller , Body ,Post, HttpStatus,Res, UseGuards, Request} from "@nestjs/common";
import { Response } from 'express';
import { OtpService } from "./otp.service";
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { verifyOtpDto } from "./dto/verify-otp.dto";
import { OTP_MESSAGES } from "src/utils/constants";
import { JwtAuthGuard } from "src/auth/guards/jwt.guard";

@ApiTags('OTP')
@ApiBearerAuth()
@Controller('otp')
@UseGuards(JwtAuthGuard)
export class OtpController {
  constructor(private readonly otpService: OtpService) {}

  @Post()
  @ApiOperation({ summary: OTP_MESSAGES.OTP_CREATE_SUMMARY })
  @ApiResponse({ status: 201, description: OTP_MESSAGES.OTP_GENERATED_SUCCESS })
  @ApiBody({ schema: { properties: { email: { type: 'string' } } } })
  generateOtp(@Request() req) {
    return this.otpService.generateOtp(req.user);
  }
  
  @Post('_verify')
  @ApiOperation({ summary: OTP_MESSAGES.OTP_VERIFY_SUMMARY })
  @ApiResponse({ status: 201, description: OTP_MESSAGES.OTP_VERIFIED })
  @ApiResponse({ status: 400, description: OTP_MESSAGES.USER_ID_REQUIRED  })
  @ApiResponse({ status: 410, description: OTP_MESSAGES.OTP_EXPIRED })
  @ApiBody({ type: verifyOtpDto }) 
  async verifyOtp(@Body() body: verifyOtpDto, @Res() res: Response) {
  if (!body.userId) {
    return res.status(HttpStatus.BAD_REQUEST).json({ message: 'User ID is required' });
  }
  if (!body.otp) {
    return res.status(HttpStatus.BAD_REQUEST).json({ message: 'OTP is required' });
  }


  const result = await this.otpService.verifyOtp(body.userId,body.otp);
  return res.status(result.statusCode ?? HttpStatus.INTERNAL_SERVER_ERROR).json(result);
    }
  }