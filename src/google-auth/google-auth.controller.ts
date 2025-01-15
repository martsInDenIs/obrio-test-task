import {
  Controller,
  Get,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { GoogleAuthService } from './google-auth.service';
import { GetCodeQueryDTO } from './dto/get-code.query.dto';
import { HasAuthTokensGuard } from './guard/has.auth.tokens.guard';

@UseGuards(HasAuthTokensGuard)
@Controller('google-auth')
export class GoogleAuthController {
  constructor(private readonly service: GoogleAuthService) {}

  @Get()
  getAuthUrl() {
    return this.service.getUrl();
  }

  @UsePipes(ValidationPipe)
  @Get('code')
  async exchangeCodeToToken(@Query() { code }: GetCodeQueryDTO) {
    await this.service.setupClient(code);

    return 'Access was successfully granted!';
  }
}
