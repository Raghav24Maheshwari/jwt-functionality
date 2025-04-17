import { Module } from '@nestjs/common';
import { DatabaseModule } from './config/database.module';
import { ConfigModule } from '@nestjs/config';
import { OtpModule } from './otp/otp.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    OtpModule,
    UserModule,
    AuthModule,
    AdminModule,
    // controllers: [AppController],
    // providers: [AppService],
  ],
})
export class AppModule {}
