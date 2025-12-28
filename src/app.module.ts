import {
  MiddlewareConsumer,
  Module,
  NestModule,
  OnModuleInit,
  RequestMethod,
  ValidationPipe,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_PIPE, ModuleRef } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import {
  addTransactionalDataSource,
  initializeTransactionalContext,
} from 'typeorm-transactional';
import { dataSource } from '../data-source';
import { AdminModule } from './admin/admin.module';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import globalConfig from './common/configs/global.config';
import { TIME_ZONE_HCM } from './common/constants/index.constant';
import { CoreModule } from './core/core.module';
import { ExternalModule } from './external/external.module';
import { FileModule } from './files/file.module';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { ProvinceModule } from './provinces/provinces.module';
import { RedisModule } from './redis/redis.module';
import { SocketModule } from './socket/socket.module';
import { UserModule } from './users/user.module';
import { WeddingModule } from './weddings/wedding.module';
import { ZaloZnsModule } from './zalo-zns/zalo-zns.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [globalConfig],
      cache: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({}),
      dataSourceFactory: async () => {
        initializeTransactionalContext();
        return addTransactionalDataSource(dataSource);
      },
    }),
    RedisModule,
    CoreModule,
    AuthModule,
    ZaloZnsModule,
    AdminModule,
    UserModule,
    WeddingModule,
    ProvinceModule,
    ExternalModule,
    SocketModule,
    FileModule,
  ].filter(Boolean),
  providers: [
    { provide: APP_PIPE, useValue: new ValidationPipe({ transform: true }) },
  ],
  controllers: [AppController],
})
export class AppModule implements OnModuleInit, NestModule {
  constructor(private moduleRef: ModuleRef) {}
  onModuleInit() {
    dayjs.extend(utc);
    dayjs.extend(timezone);
    dayjs.tz.setDefault(TIME_ZONE_HCM);
  }
  public configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).exclude().forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}
