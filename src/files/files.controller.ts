import {
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { LoadFilesBodyDTO } from './dtos/load.files.body.dto';
import { FilesService } from './files.service';

@UsePipes(new ValidationPipe({ forbidNonWhitelisted: true }))
@Controller('files')
export class FilesController {
  constructor(private readonly service: FilesService) {}

  @Get('list')
  list() {
    return this.service.get();
  }

  @Post('load')
  loadFiles(@Body() { urls }: LoadFilesBodyDTO) {
    return this.service.loadFiles(urls);
  }
}
