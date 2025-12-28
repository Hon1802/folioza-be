import { JwtPayload } from 'jsonwebtoken';
import { UserType } from '../../enums/user-type.enum';

export interface JwtAuthPayload extends JwtPayload {
  userId: number;
  userType?: UserType;
  role?: string;
}
