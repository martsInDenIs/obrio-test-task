import { Injectable } from '@nestjs/common';
import { Credentials, OAuth2Client } from 'google-auth-library';
import { AUTH_SCOPE, CREDENTIALS_FILE_NAME } from './google-auth.constants';
import { writeFileSync, readFileSync, existsSync } from 'fs';

@Injectable()
export class GoogleAuthService {
  private credentialsGranted: boolean;
  private oAuth2Client: OAuth2Client;

  constructor() {
    this.oAuth2Client = new OAuth2Client(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_REDIRECT_URL,
    );

    if (existsSync(CREDENTIALS_FILE_NAME)) {
      const credentials: Credentials = JSON.parse(
        readFileSync(CREDENTIALS_FILE_NAME).toString(),
      );

      this.setClientCredentials(credentials);
    }
  }

  private setClientCredentials(credentials: Credentials) {
    this.oAuth2Client.setCredentials(credentials);
    this.credentialsGranted = true;
  }

  private preserveCredentials(tokens: Credentials): Credentials {
    // Manual refreshing of access token will delete refresh_token from file, because refresh_token can be granted only once.
    // The idea - refresh only that data, that were in the response
    const oldTokens = JSON.parse(
      readFileSync(CREDENTIALS_FILE_NAME).toString(),
    );
    const newTokens: Credentials = { ...oldTokens, ...tokens };

    writeFileSync(CREDENTIALS_FILE_NAME, JSON.stringify(newTokens));

    return newTokens;
  }

  getUrl() {
    return this.oAuth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: AUTH_SCOPE,
    });
  }

  getClient() {
    if (!this.credentialsGranted) {
      throw new Error(
        'Client tokens hasn`t been set up. Please do it before use client',
      );
    }
    return this.oAuth2Client;
  }

  async setupClient(code: string) {
    const response = await this.oAuth2Client.getToken(code);

    const newCredentials = this.preserveCredentials(response.tokens);

    this.setClientCredentials(newCredentials);
  }
}
