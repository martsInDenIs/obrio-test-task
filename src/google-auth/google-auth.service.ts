import { Injectable } from '@nestjs/common';
import { OAuth2Client } from 'google-auth-library';
import { AUTH_SCOPE } from './google-auth.constants';

@Injectable()
export class GoogleAuthService {
  private oAuth2Client: OAuth2Client;

  constructor() {
    this.oAuth2Client = new OAuth2Client(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_REDIRECT_URL,
    );
  }

  getUrl() {
    return this.oAuth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: AUTH_SCOPE,
    });
  }

  getClient() {
    return this.oAuth2Client;
  }

  async setAuthToken(code: string) {
    const response = await this.oAuth2Client.getToken(code);
    this.oAuth2Client.setCredentials(response.tokens);
  }
}
