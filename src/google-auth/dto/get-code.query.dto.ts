import { IsNotEmpty, IsString } from 'class-validator';

export class GetCodeQueryDTO {
  @IsNotEmpty()
  @IsString()
  code: string;
}
