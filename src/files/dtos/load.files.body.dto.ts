import { IsArray, IsString } from 'class-validator';

export class LoadFilesBodyDTO {
  @IsArray()
  @IsString({ each: true })
  links: string[];
}
