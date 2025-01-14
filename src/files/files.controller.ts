import {
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { LoadFilesBodyDTO } from './dtos/load.files.body.dto';

@UsePipes(new ValidationPipe({ forbidNonWhitelisted: true }))
@Controller('files')
export class FilesController {
  @Get('list')
  list(body: LoadFilesBodyDTO) {}

  @Post('load')
  loadFiles() {}
}
