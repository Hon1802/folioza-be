import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { FastifyReply, FastifyRequest } from 'fastify';
import * as fs from 'fs';
import path, { extname } from 'path';
import { CreateWeddingAdminRequestDto } from '../dtos/requests/create.request.dto';
import { UpdateWeddingMusicRequestDto } from '../dtos/requests/music.request.dto';
import { UpdateWeddingAdminRequestDto } from '../dtos/requests/update.request.dto';
import { WeddingService } from '../services/wedding.service';
@Controller({ version: '1', path: `weddings` })
@ApiTags('Wedding Controller')
export class WeddingController {
  constructor(private readonly weddingService: WeddingService) {}
  @Post()
  async createWedding(@Body() dto: CreateWeddingAdminRequestDto) {
    return this.weddingService.createWedding(dto);
  }

  // GET DETAIL
  @Get(':id')
  getDetail(@Param('id', ParseIntPipe) id: number) {
    return this.weddingService.getWeddingDetail(id);
  }

  // UPDATE
  @Patch(':id')
  updateWedding(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateWeddingAdminRequestDto,
  ) {
    return this.weddingService.updateWedding(id, dto);
  }

  @Get(':id/music')
  async getWeddingMusic(@Param('id') id: number, @Res() reply: FastifyReply) {
    const musicUrl = await this.weddingService.getWeddingMusic(id);
    if (!musicUrl) {
      throw new NotFoundException('Music not found');
    }

    const filePath = path.join(process.cwd(), musicUrl);

    if (!fs.existsSync(filePath)) {
      throw new NotFoundException('Music file not found');
    }

    reply.header('Content-Type', 'audio/mpeg');
    reply.header('Accept-Ranges', 'bytes');

    const stream = fs.createReadStream(filePath);
    return reply.send(stream);
  }

  @Post(':id/music')
  @ApiOperation({ summary: 'Upload wedding background music' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        music: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  async addWeddingMusic(@Param('id') id: number, @Req() req: FastifyRequest) {
    const file = await req.file();

    if (!file) {
      throw new BadRequestException('Music file is required');
    }

    if (!file.mimetype.startsWith('audio/')) {
      throw new BadRequestException('Only audio files allowed');
    }

    const uploadDir = path.join(process.cwd(), 'uploads/music');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const ext = extname(file.filename);
    const filename = `${Date.now()}-${Math.random()
      .toString(36)
      .substring(2)}${ext}`;

    const filePath = path.join(uploadDir, filename);

    const buffer = await file.toBuffer();
    fs.writeFileSync(filePath, new Uint8Array(buffer));

    const musicUrl = `/uploads/music/${filename}`;

    return this.weddingService.addWeddingMusic(Number(id), musicUrl);
  }

  @Patch(':id/music')
  updateMusic(
    @Param('id') id: number,
    @Body() dto: UpdateWeddingMusicRequestDto,
  ) {
    return this.weddingService.updateWeddingMusic(id, dto);
  }

  @Delete(':id/music')
  removeMusic(@Param('id') id: number) {
    return this.weddingService.removeWeddingMusic(id);
  }
}
