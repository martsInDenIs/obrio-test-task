import { IsArray, IsNotEmptyObject, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { File } from '@prisma/client';

export class LoadFilesBodyDTO {
  @IsArray()
  @IsNotEmptyObject()
  @Type(() => FileInfoDTO)
  filesInfo: FileInfoDTO[];
}

export class FileInfoDTO implements Omit<File, 'id'> {
  @IsString()
  url: string;

  @IsString()
  name: string;
}
