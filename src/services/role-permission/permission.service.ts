import { BadRequestException, Injectable } from '@nestjs/common';
import { RepositoryService } from '../../../libs/dh-db/src/service/repository/repository.service';
import { MBaseListPayload } from '../../models/base/base-list-payload';
import { PermissionListPaginationVM, PermissionVM } from '../../models/role-permission/permission.vm';

@Injectable()
export class PermissionService {
  static async findAll(params: MBaseListPayload): Promise<PermissionListPaginationVM> {
    const response = new PermissionListPaginationVM();
    const data = await RepositoryService.permission.find({} , {skip: +params.skip, limit: +params.take || 10}).lean();

    response.data = data;
    response.skip = +params.skip || 0;
    response.take = +params.take || 10;
    response.total = await RepositoryService.permission.model.countDocuments();
    return response;
  }

  static async findALlForRole() {
    const data = await RepositoryService.permission.find({isActive: true}).lean();
    return data;
  }

  static async findById(id: string): Promise<PermissionVM> {
    try {
      const response = await RepositoryService.permission.findByObjectId(id).lean();
      return response;
    } catch (e) {
      throw new BadRequestException('Cannot find id');
    }
  }
}