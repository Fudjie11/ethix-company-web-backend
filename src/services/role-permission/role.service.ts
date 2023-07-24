import { BadRequestException, Injectable } from '@nestjs/common';
import { MBaseListPayload } from '../../models/base/base-list-payload';
import { RepositoryService } from '../../../libs/dh-db/src/service/repository/repository.service';
import { RoleListPaginationVM, RoleVM } from '../../models/role-permission/role.vm';
import { RoleEntryDto } from '../../models/role-permission/role.dto';
const ObjectId = require('mongoose').Types.ObjectId;

@Injectable()
export class RoleService {
  static async findAll(params: MBaseListPayload): Promise<RoleListPaginationVM> {
    const response = new RoleListPaginationVM();
    const data = await RepositoryService.role.find({isActive: true} , {skip: +params.skip, limit: +params.take || 10}).lean();

    response.data = data;
    response.skip = +params.skip || 0;
    response.take = +params.take || 10;
    response.total = await RepositoryService.role.model.countDocuments({isActive: true});
    return response;
  }

  static async findById(id: string): Promise<RoleVM> {
    try {
      const response = await RepositoryService.role.findByObjectId(id).lean();
      return response;
    } catch (e) {
      throw new BadRequestException('Cannot find id');
    }
  }

  static async create(payload: RoleEntryDto): Promise<RoleVM> {
    try {
      payload['isActive'] = true;
      const data = await RepositoryService.role.create(payload).then();
      return data;
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  static async update(id: string, updateRole: Partial<RoleEntryDto>): Promise<RoleVM> {
    try {
      const data = await RepositoryService.role.updateAndReturnUpdatedDocument(id, updateRole).lean();
      return data;
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  static async delete(id: string) {
    const query: any = {
      isActive: true,
      roleId: id,
    };
    const total = await RepositoryService.user.model.countDocuments(query);

    if (total > 0) {
      throw new BadRequestException('Role already used!');
    }
    
    try {
      const data = await RepositoryService.role.remove(id).lean();
      return data;
    } catch (e) {
      throw new BadRequestException(e);
    }
  }
}