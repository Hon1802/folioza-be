import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Prefix } from '../../../common/constants/index.constant';
import { NeedAdminAuthDecorator } from '../../../common/decorators/authenticate.decorator';
import {
  AppResponseDto,
  AppResponseWithPaginateDto,
} from '../../../common/dtos/app-response.dto';
import { GetListUserAdminRequestDto } from '../../dtos/requests/admin/get-list-user.admin.request.dto';
import { UserAdminResponseDto } from '../../dtos/responses/admin/user.admin.respone.dto';
import { UserAdminService } from '../../services/admin/user.admin.service';

@Controller({ version: '1', path: `${Prefix.ADMIN}/users` })
@ApiTags('Admin User Controller')
@NeedAdminAuthDecorator()
export class UserAdminController {
  constructor(private readonly userAdminService: UserAdminService) {}

  @Get()
  async getList(@Query() dto: GetListUserAdminRequestDto) {
    const results = await this.userAdminService.getList(dto);
    return new AppResponseWithPaginateDto(
      results.data.map((item) => new UserAdminResponseDto(item)),
      results.pagination,
    );
  }

  @Get(':id')
  async getById(@Param('id', ParseIntPipe) id: number) {
    const result = await this.userAdminService.getById(id);
    return new AppResponseDto(new UserAdminResponseDto(result));
  }
}
