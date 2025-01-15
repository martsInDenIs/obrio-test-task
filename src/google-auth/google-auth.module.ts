import { Module } from '@nestjs/common';
import { GoogleAuthService } from './google-auth.service';
import { GoogleAuthController } from './google-auth.controller';

@Module({
  exports: [GoogleAuthService],
  providers: [GoogleAuthService],
  controllers: [GoogleAuthController],
})
export class GoogleAuthModule {}
