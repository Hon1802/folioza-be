import { RedisModule as NestRedisModule } from '@liaoliaots/nestjs-redis';
import { Global, Module } from '@nestjs/common';
import { redisConfig } from '../common/configs/redis.config';
import { RedisService } from './services/redis.service';
@Global()
@Module({
  imports: [NestRedisModule.forRootAsync(redisConfig)],
  providers: [RedisService],
  exports: [RedisService],
})
export class RedisModule {}
