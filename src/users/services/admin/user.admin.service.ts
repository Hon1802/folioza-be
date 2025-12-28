import { Injectable } from '@nestjs/common';
import { paginate } from 'nestjs-typeorm-paginate';
import { In } from 'typeorm';
import { BadRequestExc } from '../../../common/exceptions/custom-http.exception';
import { GetListUserAdminRequestDto } from '../../dtos/requests/admin/get-list-user.admin.request.dto';
import { UserRepository } from '../../repositories/user.repository';

@Injectable()
export class UserAdminService {
  constructor(private readonly userRepository: UserRepository) {}

  async getList(dto: GetListUserAdminRequestDto) {
    const { page, limit, phoneNumber, name } = dto;

    const queryBuilder = this.userRepository
      .createQueryBuilder('user')
      .select(['user.id']);

    queryBuilder.where('1 = 1');

    if (phoneNumber) {
      queryBuilder.andWhere('user.phoneNumber ILIKE :phoneNumber', {
        phoneNumber: `%${phoneNumber}%`,
      });
    }

    if (name) {
      queryBuilder.andWhere('user.name ILIKE :name', {
        name: `%${name}%`,
      });
    }

    queryBuilder.orderBy('user.id', 'DESC');

    const { items, meta } = await paginate(queryBuilder, {
      limit,
      page,
    });

    const userIds = items.map((user) => user.id);

    const usersWithRelations = await this.userRepository.find({
      where: { id: In(userIds) },
      order: { id: 'DESC' },
    });

    return {
      data: usersWithRelations,
      pagination: meta,
    };
  }

  async getById(id: number) {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['userChildren', 'ward', 'province'],
    });

    if (!user) {
      throw new BadRequestExc('Không tìm thấy người dùng!');
    }

    return user;
  }
}
