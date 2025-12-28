import { AdminEntity } from '../../../admin/entities/admin.entity';

export interface LoginAdminResultInterface {
  admin: AdminEntity;
  accessToken: string;
  refreshToken: string;
}
