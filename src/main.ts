import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

//booststrap the application and configure global things like middleware, pipes, filters,
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.enableCors({
    origin: 'http://localhost:5173', //  frontend domain
    credentials: true,
  });

  //bind ValidationPipe at the application level to protect all endpoints
  //from receiving incorrect data
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
