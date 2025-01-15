import { Injectable } from '@nestjs/common';
import { drive, drive_v3 } from '@googleapis/drive';
import { GoogleAuthService } from 'src/google-auth/google-auth.service';
import { lookup } from 'mime-types';
import { CreateParams } from './google-drive.types';

@Injectable()
export class GoogleDriveService {
  private driveInstance: drive_v3.Drive;

  constructor(private readonly authService: GoogleAuthService) {}

  private getInstance() {
    if (!this.driveInstance) {
      this.driveInstance = drive({
        version: 'v3',
        auth: this.authService.getClient(),
      });

      return this.driveInstance;
    }

    return this.driveInstance;
  }

  private grantPermissions(
    fileId: string,
    permission: drive_v3.Schema$Permission,
  ) {
    return this.getInstance().permissions.create({
      fileId: fileId,
      requestBody: permission,
    });
  }

  async create({ fileStream, name }: CreateParams) {
    const fileInfo = await this.getInstance().files.create({
      fields: 'id, webViewLink, name',
      requestBody: {
        name,
        mimeType: lookup(name) || undefined,
      },
      media: {
        body: fileStream,
      },
    });

    // Make the file accessable to anyone
    await this.grantPermissions(fileInfo.data.id, {
      type: 'anyone',
      role: 'reader',
    });

    return { link: fileInfo.data.webViewLink, name: fileInfo.data.name };
  }

  fileList() {
    return this.getInstance().files.list();
  }
}
