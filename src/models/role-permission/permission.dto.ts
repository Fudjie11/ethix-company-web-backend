import { BaseBasicClass } from '../base/base-basic-class';
import { Types } from 'mongoose';

export class PermissionDto extends BaseBasicClass {
  _id: Types.ObjectId;
  code: string;
  name: string;
  permissionGroup: string;
  description: string;
  isActive: boolean;
}

export class PermissionEntryDto extends BaseBasicClass {
  code: string;
  name: string;
  permissionGroup: string;
  description: string;
  isActive: boolean;
}