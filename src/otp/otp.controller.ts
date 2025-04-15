import { Controller , Body ,Post, HttpStatus,Res} from "@nestjs/common";
import { Response } from 'express';
import { OtpService } from "./otp.service";
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { CreateOtpDto } from "./dto/create-otp.dto";
import { verifyOtpDto } from "./dto/verify-otp.dto";
import { OTP_MESSAGES } from "src/utils/constants";

@ApiTags('OTP')
@Controller('otp')
export class OtpController {
  constructor(private readonly otpService: OtpService) {}

  @Post()
  @ApiOperation({ summary: OTP_MESSAGES.OTP_CREATE_SUMMARY })
  @ApiResponse({ status: 201, description: OTP_MESSAGES.OTP_GENERATED_SUCCESS })
  @ApiResponse({ status: 400, description: OTP_MESSAGES.USER_ID_REQUIRED })
  @ApiResponse({ status: 409, description: OTP_MESSAGES.USER_ID_EXISTS })
  @ApiBody({ type: CreateOtpDto }) 
  async generateOtp(@Body() body: CreateOtpDto, @Res() res: Response) {
    if (!body || !body.userId) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: 'User ID is required' });
    }
       console.log(body.userId,"from")
    const result = await this.otpService.generateOtp(body.userId,body.email,body.username);
    return res.status(result.statusCode).json(result);
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