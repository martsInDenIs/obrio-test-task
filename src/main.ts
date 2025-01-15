import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from 'nestjs-pino';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });

  const pino = app.get(Logger);

  app.useLogger(pino);

  await app.listen(process.env.PORT, () => {
    pino.log(`Server is running on port: ${process.env.PORT}`);
  });
}

bootstrap();
