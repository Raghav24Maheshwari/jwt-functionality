import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { SignupDto } from "./dto/signup.dto";
import { LoginDto } from "./dto/login.dto";
import { ApiBody, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { AUTH_MESSAGES, USER_MESSAGES } from "src/utils/constants";

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: AUTH_MESSAGES.SIGNUP_SUMMARY })
  @ApiResponse({ status: 201, description: AUTH_MESSAGES.USER_CREATION })
  @ApiResponse({ status: 409, description: AUTH_MESSAGES.CONFLICT })
  @ApiBody(({ type: SignupDto }))
  @Post('signup')
  signup(@Body() dto: SignupDto) {
    return this.authService.signup(dto);
  }

  @ApiOperation({ summary: AUTH_MESSAGES.SIGNIN_SUMMARY })
  @ApiResponse({ status: 200, description: AUTH_MESSAGES.USER_LOGIN })
  @ApiResponse({ status: 400, description: AUTH_MESSAGES.LOGIN_FAILUAR })
  @ApiBody(({ type: LoginDto }))
  @Post('signin')
  signin(@Body() dto: LoginDto) {
    return this.authService.signin(dto);
  }
}
