import { Module } from '@nestjs/common';
import { GoogleDriveService } from './google-drive.service';
import { GoogleDriveController } from './google-drive.controller';
import { GoogleAuthModule } from 'src/google-auth/google-auth.module';

@Module({
  imports: [GoogleAuthModule],
  providers: [GoogleDriveService],
  controllers: [GoogleDriveController],
  exports: [],
})
export class GoogleDriveModule {}
