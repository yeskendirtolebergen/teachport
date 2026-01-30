import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  app.enableCors();

  if (process.env.NODE_ENV === 'development') {
    await app.listen(process.env.PORT ?? 3001);
    console.log(`Backend running local on port 3001`);
  } else {
    await app.init();
    return app.getHttpAdapter().getInstance();
  }
}

if (process.env.NODE_ENV === 'development') {
  bootstrap();
}

let handler: any;
export default async (req: any, res: any) => {
  if (!handler) {
    handler = await bootstrap();
  }
  return handler(req, res);
};
