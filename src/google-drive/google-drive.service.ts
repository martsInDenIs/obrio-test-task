import { Injectable } from '@nestjs/common';
import { drive } from '@googleapis/drive';
import { GoogleAuthService } from 'src/google-auth/google-auth.service';

@Injectable()
export class GoogleDriveService {
  constructor(private readonly authService: GoogleAuthService) {}

  get() {
    return drive({
      version: 'v3',
      auth: this.authService.getClient(),
    }).files.create();
  }
}
