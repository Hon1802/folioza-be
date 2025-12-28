import * as dotenv from 'dotenv';
import { RecursiveKeyOf } from '../types/utils.type';
import { boolean } from 'boolean';
dotenv.config();

const globalConfig = {
  app: {
    env: process.env.NODE_ENV,
  },
  auth: {
    jwtSecretKey: process.env.JWT_SECRET_KEY,
    accessToken: {
      expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRES_IN,
    },
    refreshToken: {
      expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRES_IN,
    },
    userLoginKey: process.env.AUTH_USER_LOGIN_KEY,
  },
  external: {
    vgs: {
      smsUrl: process.env.VGS_SMS_URL,
      znsUrl: process.env.VGS_ZNS_URL,
      accessToken: process.env.VGS_ACCESS_TOKEN,
      znsOaId: process.env.VGS_ZNS_OA_ID,
      username: process.env.VGS_USERNAME,
      branchName: process.env.VGS_BRANCH_NAME,
      mooziWaExchangeGiftZnsTemplateId:
        process.env.VGS_MOOZI_WA_EXCHANGE_GIFT_ZNS_TEMPLATE_ID,
      pgmsUpdateInventoryZnsTemplateId:
        process.env.VGS_PGMS_UPDATE_INVENTORY_ZNS_TEMPLATE_ID,
      otpZnsTemplateId: process.env.VGS_OTP_ZNS_TEMPLATE_ID,
    },
  },
  redis: {
    cloud: {
      host: process.env.REDIS_CLOUD_HOST,
      port: +process.env.REDIS_CLOUD_PORT,
      password: process.env.REDIS_CLOUD_PASSWORD,
      caPem: process.env.REDIS_CLOUD_CA_PEM
        ? process.env.REDIS_CLOUD_CA_PEM.replace(/\\n/gm, '\n')
        : '',
    },
    sentinels:
      process.env.REDIS_SENTINELS?.split('|')?.map((item) => {
        const [host, port] = item?.split(':') || [];
        return { host, port };
      }) || [],
    standAlone: {
      host: process.env.REDIS_HOST,
      port: +process.env.REDIS_PORT,
    },
    password: process.env.REDIS_PASSWORD,
    redisGroupName: 'myMaster',
    usingRedisSentinel: boolean(process.env.REDIS_USING_REDIS_SENTINEL),
    usingRedisCloud: boolean(process.env.REDIS_USING_REDIS_CLOUD),
  },
  storage: {
    projectId: process.env.STORAGE_PROJECT_ID,
    clientEmail: process.env.STORAGE_CLIENT_EMAIL,
    privateKey: process.env.STORAGE_PRIVATE_KEY.replace(/\\n/gm, '\n'),
    mediaBucket: process.env.STORAGE_MEDIA_BUCKET,
  },
};

export default () => globalConfig;
export type GlobalConfig = Record<RecursiveKeyOf<typeof globalConfig>, string>;
