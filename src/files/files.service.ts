import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { FileInfoDTO } from './dtos/load.files.body.dto';

@Injectable()
export class FilesService {
  constructor(private readonly db: DatabaseService) {}

  get() {
    return this.db.file.findMany();
  }

  loadFiles(filesInfo: FileInfoDTO[]) {
    return this.db.file.createMany({
      data: filesInfo,
    });
  }
}
