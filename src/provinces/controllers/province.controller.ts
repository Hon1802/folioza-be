import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GetListProvinceRequestDto } from '../dtos/requests/get-list-province.request.dto';
import { ProvinceService } from '../services/province.service';

@Controller({ version: '1', path: `/provinces` })
@ApiTags('Province Controller')
export class ProvinceController {
  constructor(private readonly provinceService: ProvinceService) {}

  @Get()
  async getList(@Query() dto: GetListProvinceRequestDto) {
    const result = await this.provinceService.getList(dto);
    return result;
  }
}
