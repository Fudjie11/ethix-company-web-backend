import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { Types } from 'mongoose';
import { BaseBasicVmClass } from '../base/base-basic-class';
import { MBaseListResponse } from '../base/base-list-response';
import { PermissionVM } from './permission.vm';

export class RoleVM extends BaseBasicVmClass {
  @ApiProperty()
  _id: Types.ObjectId;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  isActive: boolean;

  @ApiProperty()
  permissionIds: Types.ObjectId[];

  @ApiProperty()
  permissions: PermissionVM[];
}

export class RoleEntryVM {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  description: string;

  @ApiProperty()
  @IsOptional()
  permissionIds: Types.ObjectId[];
}

export class RoleListPaginationVM extends MBaseListResponse<RoleVM[]> {}