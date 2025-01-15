import { Controller, Get } from '@nestjs/common';
import { GoogleDriveService } from './google-drive.service';

@Controller('google-drive')
export class GoogleDriveController {
  constructor(private readonly service: GoogleDriveService) {}

  @Get()
  testEndpoint() {
    return this.service.get();
  }
}
