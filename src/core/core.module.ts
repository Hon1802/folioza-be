import { Global, Module } from '@nestjs/common';
import { LoggerService } from './logger';
import { CoreServices, LoggerFactory } from './types';

@Global()
@Module({
  imports: [],
  controllers: [],
  providers: [
    {
      provide: CoreServices.LoggingService,
      useFactory: (): LoggerFactory => {
        return { create: (context: string) => new LoggerService(context) };
      },
    },
  ],
  exports: [CoreServices.LoggingService],
})
export class CoreModule {}
