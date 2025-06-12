import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

//this file is for bootstrapping the application and configuring global things like middleware, pipes, filters,
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //bind ValidationPipe at the application level to protect all endpoints
  //from receiving incorrect data
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
