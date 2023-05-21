import { BaseBasicClass } from '../base/base-basic-class';
import { PermissionDto } from './permission.dto';
import { Types } from 'mongoose';

export class RoleDto extends BaseBasicClass {
  _id: Types.ObjectId;
  name: string;
  description: string;
  isActive: boolean;
  permissionIds: Types.ObjectId[];
  permissions: PermissionDto[];
}

export class RoleEntryDto extends BaseBasicClass {
  name: string;
  description: string;
  permissionIds: Types.ObjectId[];
}