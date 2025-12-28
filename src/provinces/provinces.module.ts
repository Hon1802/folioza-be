import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { ProvinceController } from './controllers/province.controller';
import { WardController } from './controllers/ward.controller';
import { ProvinceRepository } from './repositories/province.repository';
import { WardRepository } from './repositories/ward.repository';
import { ProvinceService } from './services/province.service';
import { WardService } from './services/ward.service';

@Module({
  imports: [AuthModule],
  controllers: [ProvinceController, WardController],
  providers: [ProvinceService, WardService, ProvinceRepository, WardRepository],
})
export class ProvinceModule {}
