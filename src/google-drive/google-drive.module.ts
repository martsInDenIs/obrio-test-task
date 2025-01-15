import { Module } from '@nestjs/common';
import { GoogleDriveService } from './google-drive.service';
import { GoogleAuthModule } from 'src/google-auth/google-auth.module';

@Module({
  imports: [GoogleAuthModule],
  providers: [GoogleDriveService],
  exports: [GoogleDriveService],
})
export class GoogleDriveModule {}
