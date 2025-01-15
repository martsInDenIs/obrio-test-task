import { Module } from '@nestjs/common';
import { FilesController } from './files.controller';
import { FilesService } from './files.service';
import { DatabaseModule } from 'src/database/database.module';
import { UploadFilesModule } from 'src/upload-files/upload-files.module';
import { GoogleDriveModule } from 'src/google-drive/google-drive.module';

@Module({
  imports: [DatabaseModule, UploadFilesModule, GoogleDriveModule],
  controllers: [FilesController],
  providers: [FilesService],
})
export class FilesModule {}
