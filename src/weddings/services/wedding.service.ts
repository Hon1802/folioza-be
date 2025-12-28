import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { LoggerService } from '../../core';
import { CreateWeddingAdminRequestDto } from '../dtos/requests/create.request.dto';
import { UpdateWeddingAdminRequestDto } from '../dtos/requests/update.request.dto';
import { WeddingRepository } from '../reponsitories/wedding.repository';
import { UpdateWeddingMusicRequestDto } from '../dtos/requests/music.request.dto';

@Injectable()
export class WeddingService {
  private readonly _logger = new LoggerService(WeddingService.name);

  constructor(private readonly weddingRepository: WeddingRepository) {}

  async createWedding(dto: CreateWeddingAdminRequestDto) {
    const wedding = this.weddingRepository.create({
      themes: dto.themes,
      weddingObjects: dto.weddingObjects,
    });

    const savedWedding = await this.weddingRepository.save(wedding);

    return {
      data: savedWedding,
      message: 'Wedding created successfully',
    };
  }
  // GET DETAIL
  async getWeddingDetail(id: number) {
    const wedding = await this.weddingRepository.findOne({
      where: { id },
    });

    if (!wedding) {
      throw new NotFoundException('Wedding not found');
    }

    return wedding;
  }

  // UPDATE
  async updateWedding(id: number, dto: UpdateWeddingAdminRequestDto) {
    const wedding = await this.getWeddingDetail(id);

    Object.assign(wedding, {
      ...(dto.themes && { themes: dto.themes }),
      ...(dto.weddingObjects && { weddingObjects: dto.weddingObjects }),
    });

    return this.weddingRepository.save(wedding);
  }
  // Music
  async getWeddingMusic(id: number) {
    const wedding = await this.getWeddingDetail(id);

    return wedding.themes?.musicUrl ?? null;
  }

  async addWeddingMusic(id: number, musicUrl: string) {
    const wedding = await this.getWeddingDetail(id);
    wedding.themes = {
      ...wedding.themes,
      musicUrl,
    };

    await this.weddingRepository.save(wedding);

    return {
      message: 'Music uploaded successfully',
      musicUrl,
    };
  }

  async updateWeddingMusic(id: number, dto: UpdateWeddingMusicRequestDto) {
    const wedding = await this.getWeddingDetail(id);

    if (dto.musicUrl) {
      wedding.themes.musicUrl = dto.musicUrl;
    }

    await this.weddingRepository.save(wedding);

    return {
      message: 'Music updated successfully',
      musicUrl: wedding.themes?.musicUrl,
    };
  }

  async removeWeddingMusic(id: number) {
    const wedding = await this.getWeddingDetail(id);

    wedding.themes.musicUrl = null;

    await this.weddingRepository.save(wedding);

    return {
      message: 'Music removed successfully',
    };
  }
}
