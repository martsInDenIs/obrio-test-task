import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { FilesModule } from './files/files.module';

@Module({
  providers: [],
  controllers: [],
  imports: [ConfigModule.forRoot({ isGlobal: true }), FilesModule],
})
export class AppModule {}
