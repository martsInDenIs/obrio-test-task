import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { UploadFilesService } from 'src/upload-files/upload-files.service';
import { GoogleDriveService } from 'src/google-drive/google-drive.service';
import { Logger } from '@nestjs/common';
@Injectable()
export class FilesService {
  private readonly logger = new Logger(FilesService.name);

  constructor(
    private readonly db: DatabaseService,
    private readonly uploadService: UploadFilesService,
    private readonly googleDrive: GoogleDriveService,
  ) {}

  get() {
    return this.db.file.findMany();
  }

  async loadFiles(urls: string[]) {
    return urls.forEach(async (url) => {
      try {
        const res = await this.uploadService.getFileStream(url);

        const { link, name } = await this.googleDrive.create({
          fileStream: res.data,
          name: url.substring(url.lastIndexOf('/') + 1),
        });

        await this.db.file.create({
          data: { name, url: link },
        });
      } catch (err) {
        this.logger.error(err);
      }
    });
  }
}
