import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { GlobalConfig } from '../../../common/configs/global.config';
import { JwtAuthPayload } from '../../interfaces/common/jwt-payload.interface';

@Injectable()
export class AuthCommonService {
  constructor(private configService: ConfigService<GlobalConfig>) {}

  generateAccessToken(payload: JwtAuthPayload) {
    return jwt.sign(payload, this.configService.get('auth.jwtSecretKey'), {
      expiresIn: this.configService.get('auth.accessToken.expiresIn'),
    });
  }

  generateRefreshToken(payload: JwtAuthPayload) {
    return jwt.sign(payload, this.configService.get('auth.jwtSecretKey'), {
      expiresIn: this.configService.get('auth.refreshToken.expiresIn'),
    });
  }

  verifyToken(token: string) {
    return jwt.verify(token, this.configService.get('auth.jwtSecretKey'));
  }

  decodeToken(token: string) {
    return jwt.decode(token);
  }

  hashPassword(plain: string, hashRounds = 10): string {
    return bcrypt.hashSync(plain, hashRounds);
  }

  compareHash(plain: string, hash: string): boolean {
    return bcrypt.compareSync(plain, hash);
  }
}
