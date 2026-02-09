import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import * as morgan from 'morgan';

dotenv.config();

async function serverConfig() {
  const app = await NestFactory.create(AppModule);

  const { CLIENT_URL, PORT } = process.env;

  app.setGlobalPrefix('api');

  app.enableCors({
    origin: [CLIENT_URL],
    credentials: true,
  });

  app.use(morgan('dev'));


  await app.listen(PORT || 3000);
  console.log(`Example app listening on port ${PORT || 3000}`);
}
serverConfig();

module.exports = serverConfig;