import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { FilesModule } from './files/files.module';
import { DatabaseModule } from './database/database.module';

@Module({
  providers: [],
  controllers: [],
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    FilesModule,
    DatabaseModule,
  ],
})
export class AppModule {}
