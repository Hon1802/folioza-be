import { Injectable } from '@nestjs/common';
import { GetProfileAdminResultInterface } from '../../../admin/interfaces/admin/profile.admin.interface';
import { AdminAuthenticatedInterface } from '../../../common/interfaces/authenticate.interface';
import { AdminRepository } from '../../repositories/admin.repository';
import { NotFoundExc } from '../../../common/exceptions/custom-http.exception';

@Injectable()
export class ProfileAdminService {
  constructor(private readonly adminRepository: AdminRepository) {}

  async getProfile(
    adminAuth: AdminAuthenticatedInterface,
  ): Promise<GetProfileAdminResultInterface> {
    const admin = await this.adminRepository.findByIdAndActive(adminAuth.id);

    if (!admin) {
      throw new NotFoundExc('Không tìm thấy admin!');
    }

    return admin;
  }
}
