import {
  RedisModuleAsyncOptions,
  RedisModuleOptions,
} from '@liaoliaots/nestjs-redis';
import { ConfigService } from '@nestjs/config';
import { RedisNamespace } from '../../redis/enums/redis.enum';
import globalConfig, { GlobalConfig } from './global.config';

export const redisConfig: RedisModuleAsyncOptions = {
  inject: [ConfigService],
  useFactory: (configSer: ConfigService<GlobalConfig>) => {
    const appConfig = globalConfig();
    const sentinelsConfig =
      configSer.get<typeof appConfig.redis.sentinels>('redis.sentinels');
    const sentinels = sentinelsConfig.map((item) => ({
      host: item.host,
      port: Number(item.port),
    }));
    const password = configSer.get('redis.password');
    const groupName = configSer.get('redis.redisGroupName');
    const redisHost = configSer.get('redis.standAlone.host');
    const redisPort = configSer.get('redis.standAlone.port');
    const redisCloudHost = configSer.get('redis.cloud.host');
    const redisCloudPort = configSer.get('redis.cloud.port');
    const redisCloudPassword = configSer.get('redis.cloud.password');
    const redisCloudCaPem = configSer.get('redis.cloud.caPem');
    const usingSentinel = configSer.get('redis.usingRedisSentinel');
    const usingCloud = configSer.get('redis.usingRedisCloud');

    let redisConfig: RedisModuleOptions = {
      readyLog: true,
      errorLog: true,
      closeClient: true,
    };

    if (usingSentinel) {
      redisConfig = {
        commonOptions: {
          sentinels,
          password,
          name: groupName,
          failoverDetector: true,
        },
        config: [
          { namespace: RedisNamespace.MASTER_NS },
          { namespace: RedisNamespace.SLAVE_NS },
        ],
      };
    } else if (usingCloud) {
      redisConfig = {
        ...redisConfig,
        commonOptions: {
          host: redisCloudHost,
          port: Number(redisCloudPort),
          password: redisCloudPassword,
          tls: {
            ca: redisCloudCaPem,
            rejectUnauthorized: true, // Enforces server certificate validation
          },
        },
        config: [
          { namespace: RedisNamespace.MASTER_NS },
          { namespace: RedisNamespace.SLAVE_NS },
        ],
      };
    } else {
      redisConfig = {
        ...redisConfig,
        commonOptions: { host: redisHost, port: Number(redisPort), password },
        config: [
          { namespace: RedisNamespace.MASTER_NS },
          { namespace: RedisNamespace.SLAVE_NS },
        ],
      };
    }

    return redisConfig;
  },
};
