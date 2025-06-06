import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

//this file is for bootstrapping the application and configuring global things like middleware, pipes, filters,
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
