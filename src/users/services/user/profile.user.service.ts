import { Injectable } from '@nestjs/common';
import { Transactional } from 'typeorm-transactional';
import { NotFoundExc } from '../../../common/exceptions/custom-http.exception';
import { UserAuthenticatedInterface } from '../../../common/interfaces/authenticate.interface';
import { UserStatusEnum } from '../../../users/enums/user.enum';
import { UserChildrenRepository } from '../../../users/repositories/user-children.repository';
import { UpdateUserProfileRequestDto } from '../../dtos/requests/user/update-profile.user.request.dto';
import { GetProfileUserResultInterface } from '../../interfaces/user/profile.user.interface';
import { UserRepository } from '../../repositories/user.repository';

@Injectable()
export class ProfileUserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly userChildrenRepository: UserChildrenRepository,
  ) {}

  async getProfile(
    userAuth: UserAuthenticatedInterface,
  ): Promise<GetProfileUserResultInterface> {
    const user = await this.userRepository.findOne({
      where: { id: userAuth.id, status: UserStatusEnum.ACTIVE },
      relations: ['ward', 'province', 'userChildren'],
    });

    if (!user) {
      throw new NotFoundExc('Không tìm thấy người dùng!');
    }

    return user;
  }

  @Transactional()
  async update(
    userAuth: UserAuthenticatedInterface,
    dto: UpdateUserProfileRequestDto,
  ): Promise<GetProfileUserResultInterface> {
    const user = await this.userRepository.findByIdAndActive(userAuth.id);

    if (!user) {
      throw new NotFoundExc('Không tìm thấy người dùng!');
    }

    // Destructure DTO to separate user profile data from children data
    const { children, ...userProfileData } = dto;

    // Prepare update operations
    const updateOperations: Promise<any>[] = [];

    // Update user profile if there are changes
    if (Object.keys(userProfileData).length > 0) {
      updateOperations.push(
        this.userRepository.update(userAuth.id, userProfileData),
      );
    }

    // Update user children if provided
    if (children && children.length > 0) {
      const childrenUpdates = children.map((child) => {
        const updateData: any = {
          id: child.id,
          userId: userAuth.id,
        };

        if (child.name !== undefined) updateData.name = child.name;
        if (child.age !== undefined) updateData.age = child.age;
        if (child.clothingSize !== undefined)
          updateData.clothingSize = child.clothingSize;

        return updateData;
      });

      updateOperations.push(this.userChildrenRepository.save(childrenUpdates));
    }

    // Execute all updates in parallel
    if (updateOperations.length > 0) {
      await Promise.all(updateOperations);
    }

    return await this.getProfile(userAuth);
  }
}
