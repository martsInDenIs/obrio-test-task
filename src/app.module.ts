import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { FilesModule } from './files/files.module';
import { DatabaseModule } from './database/database.module';
import { GoogleDriveModule } from './google-drive/google-drive.module';
import { GoogleAuthModule } from './google-auth/google-auth.module';
import { UploadFilesModule } from './upload-files/upload-files.module';

@Module({
  providers: [],
  controllers: [],
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    FilesModule,
    DatabaseModule,
    GoogleDriveModule,
    GoogleAuthModule,
    UploadFilesModule,
  ],
})
export class AppModule {}
