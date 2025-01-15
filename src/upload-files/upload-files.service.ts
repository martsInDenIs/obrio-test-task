import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { Stream } from 'node:stream';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class UploadFilesService {
  constructor(private readonly httpService: HttpService) {}

  getFileStream(url: string) {
    return firstValueFrom(
      this.httpService.get<Stream>(url, {
        responseType: 'stream',
      }),
    );
  }
}
