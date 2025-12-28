import { SystemConfig } from '../entities/system-config.entity';

export interface ZMAConfigInterface extends SystemConfig {
  data: {
    version: string;
    env: string;
    appId: string;
  };
}

export interface VGSConfigInterface extends SystemConfig {
  data: {
    isActiveZNS: boolean;
  };
}
