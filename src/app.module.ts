import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
  providers: [],
  controllers: [],
  imports: [ConfigModule.forRoot({ isGlobal: true })],
})
export class AppModule {}
