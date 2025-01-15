import { CanActivate, Injectable } from '@nestjs/common';
import { existsSync } from 'fs';
import { CREDENTIALS_FILE_NAME } from '../google-auth.constants';

@Injectable()
export class HasAuthTokensGuard implements CanActivate {
  canActivate(): boolean {
    if (existsSync(CREDENTIALS_FILE_NAME)) {
      throw new Error('Google Drive API has already been connected!');
    }

    return true;
  }
}
