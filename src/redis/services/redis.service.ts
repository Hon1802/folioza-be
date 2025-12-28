import { RedisService as NestRedisService } from '@liaoliaots/nestjs-redis';
import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { Redis } from 'ioredis';
import { GlobalConfig } from '../../common/configs/global.config';
import { LoggerService } from '../../core';
import { RedisNamespace } from '../enums/redis.enum';

@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
  private master: Redis;
  private slave: Redis;
  private readonly _logger = new LoggerService(RedisService.name);

  constructor(
    private readonly redisService: NestRedisService,
    private readonly configService: ConfigService<GlobalConfig>,
  ) {}

  /** when init module */
  async onModuleInit() {
    /** Log Redis connection status */
    this.getModeConnection();
    this.master = this.redisService.getOrNil(RedisNamespace.MASTER_NS);
    this.slave = this.redisService.getOrNil(RedisNamespace.SLAVE_NS);

    if (!this.master) {
      this._logger.error('Redis master connection not found');
    } else {
      this.bindEventListeners(this.master, 'MASTER');
      if (this.master.status === 'ready') {
        this._logger.log('Redis MASTER connected successfully');
      }
    }
    // SLAVE
    if (this.slave === this.master) {
      this._logger.warn(
        'Redis slave connection not found, using master as fallback',
      );
    } else {
      this.bindEventListeners(this.slave, 'SLAVE');
      if (this.slave.status === 'ready') {
        this._logger.log('Redis SLAVE connected successfully');
      }
    }
  }

  //** when destroy module */
  async onModuleDestroy() {
    if (this.master) {
      await this.master.quit();
    }
    if (this.slave && this.slave !== this.master) {
      await this.slave.quit();
    }
  }

  //** bind event listeners */
  private bindEventListeners(client: Redis, label: string) {
    client.on('ready', () =>
      this._logger.log(`Redis ${label} connected successfully`),
    );
    client.on('error', (err) =>
      this._logger.error(`Redis ${label} connection error: ${err.message}`),
    );
    client.on('reconnecting', () =>
      this._logger.warn(`Redis ${label} reconnecting...`),
    );
    client.on('end', () =>
      this._logger.warn(`Redis ${label} connection closed`),
    );
  }

  /** Get master connection */
  getMaster(): Redis {
    return this.master;
  }

  /** Get slave connection */
  getSlave(): Redis {
    return this.slave;
  }

  /** Set key */
  async set(key: string, value: any, ttl?: number): Promise<'OK' | null> {
    try {
      const data = typeof value === 'object' ? JSON.stringify(value) : value;
      if (ttl) {
        return await this.master.set(key, data, 'EX', ttl);
      }
      return await this.master.set(key, data);
    } catch (error) {
      this._logger.error(`Redis SET failed [${key}]: ${error.message}`);
      return null;
    }
  }
  /** Get key */
  async get<T = any>(key: string): Promise<T | null> {
    try {
      const data = await this.slave.get(key);
      if (!data) {
        return null;
      }
      try {
        return JSON.parse(data);
      } catch {
        return data as any;
      }
    } catch (error) {
      this._logger.error(`Redis GET failed [${key}]: ${error.message}`);
      return null;
    }
  }

  /** Remove key */
  async del(key: string): Promise<number> {
    try {
      return await this.master.del(key);
    } catch (error) {
      this._logger.error(`Redis DEL failed [${key}]: ${error.message}`);
      return 0;
    }
  }

  /** Check exist key */
  async exists(key: string): Promise<boolean> {
    try {
      return (await this.slave.exists(key)) === 1;
    } catch (error) {
      this._logger.error(`Redis EXISTS failed [${key}]: ${error.message}`);
      return false;
    }
  }

  /** Reset TTL */
  async expire(key: string, ttl: number): Promise<boolean> {
    try {
      return (await this.master.expire(key, ttl)) === 1;
    } catch (error) {
      this._logger.error(`Redis EXPIRE failed [${key}]: ${error.message}`);
      return false;
    }
  }

  /** Get and delete key */
  async getAndDel<T = any>(key: string): Promise<T | null> {
    try {
      const pipeline = this.master.multi();
      pipeline.get(key);
      pipeline.del(key);
      const [getResult, delResult] = (await pipeline.exec())?.map(
        (res) => res[1],
      ) || [null, 0];

      if (!getResult) {
        return null;
      }
      try {
        return getResult as T;
      } catch {
        return getResult as any;
      }
    } catch (error) {
      this._logger.error(`Redis GET+DEL failed [${key}]: ${error.message}`);
      return null;
    }
  }

  // private
  private getModeConnection() {
    const usingSentinel = this.configService.get('redis.usingRedisSentinel');
    const usingCloud = this.configService.get('redis.usingRedisCloud');

    if (usingSentinel) {
      this._logger.log('Using Redis Sentinel');
    } else if (usingCloud) {
      this._logger.log('Using Redis Cloud');
    } else {
      this._logger.log('Using Redis Standalone');
    }
    return usingSentinel || usingCloud;
  }
}
