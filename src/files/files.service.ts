import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { FileInfoDTO } from './dtos/load.files.body.dto';
import { UploadFilesService } from 'src/upload-files/upload-files.service';
import { GoogleDriveService } from 'src/google-drive/google-drive.service';

@Injectable()
export class FilesService {
  constructor(
    private readonly db: DatabaseService,
    private readonly uploadService: UploadFilesService,
    private readonly googleDrive: GoogleDriveService,
  ) {}

  get() {
    return this.db.file.findMany();
  }

  async loadFiles(filesInfo: FileInfoDTO[]) {
    return filesInfo.forEach(async (info) => {
      try {
        const res = await this.uploadService.getFileStream(info.url);

        const gdriveLink = await this.googleDrive.create({
          fileStream: res.data,
          name: info.name,
        });

        await this.db.file.create({
          data: { name: info.name, url: gdriveLink },
        });
      } catch (err) {
        throw new Error(err);
      }
    });
  }
}
