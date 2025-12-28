import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GetListWardRequestDto } from '../dtos/requests/get-list-ward.request.dto';
import { WardService } from '../services/ward.service';

@Controller({ version: '1', path: `/wards` })
@ApiTags('Ward Controller')
export class WardController {
  constructor(private readonly wardService: WardService) {}

  @Get()
  async getList(@Query() dto: GetListWardRequestDto) {
    const result = await this.wardService.getList(dto);
    return result;
  }
}
