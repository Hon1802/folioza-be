import { UserEntity } from '../../../users/entities/user.entity';

export interface LoginUserResultInterface {
  accessToken: string;
  refreshToken: string;
  user: UserEntity;
}
