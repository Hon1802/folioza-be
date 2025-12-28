import { Module } from '@nestjs/common';
import { WeddingController } from './controllers/wedding.controller';
import { WeddingRepository } from './reponsitories/wedding.repository';
import { WeddingService } from './services/wedding.service';
@Module({
  imports: [],
  controllers: [WeddingController],
  providers: [WeddingService, WeddingRepository],
  exports: [],
})
export class WeddingModule {}
