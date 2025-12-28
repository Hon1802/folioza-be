import { AdminRoleEnum } from '../../admin/enums/admin.enum';

export interface AdminAuthenticatedInterface {
  id: number;
  email: string;
  role: AdminRoleEnum;
}

export interface UserAuthenticatedInterface {
  id: number;
  phoneNumber?: string;
}
