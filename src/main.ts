import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import multipart from '@fastify/multipart';

import { dataSource } from '../data-source';
import { AppModule } from './app.module';
import { RedisIoAdapter } from './common/adapters/redis-io.adapter';
import { Prefix } from './common/constants/index.constant';
import { runSqlMigrations } from './run-sql-migrations';
async function bootstrap() {
  // if (process.env.NODE_ENV !== 'TEST') {
  if (false) {
    await runSqlMigrations(dataSource);
    Logger.log('Data Source has been initialized!');
  }

  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  app.enableVersioning();
  app.enableCors({ origin: '*', credentials: true });
  app.setGlobalPrefix(Prefix.GLOBAL, {
    exclude: [],
  });

  const config = new DocumentBuilder()
    .setTitle(process.env.TITLE || 'Backend API')
    .setDescription(process.env.DESCRIPTION || 'The Backend API description')
    .setVersion(process.env.VERSION || '1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(`${Prefix.GLOBAL}/api`, app, document);

  const configService = app.get(ConfigService);

  const redisIoAdapter = new RedisIoAdapter(app);
  await redisIoAdapter.connectToRedis(configService);
  app.useWebSocketAdapter(redisIoAdapter);

  await app.register(multipart, {
    limits: {
      fileSize: 20 * 1024 * 1024, // 20MB
    },
  });

  await app.listen(process.env.PORT || 5000, '0.0.0.0');
  Logger.log(`APP RUN ON PORT ${process.env.PORT}`);
}
bootstrap();
