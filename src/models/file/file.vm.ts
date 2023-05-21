import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { MBaseListResponse } from '../base/base-list-response';
import { Types } from 'mongoose';

export class FileVM {
  @ApiProperty()
  _id: Types.ObjectId;

  @ApiProperty()
  fileName: string;

  @ApiProperty()
  filePath: string;

  @ApiProperty()
  fileMime: string;

  @ApiProperty()
  fileUrl: string;
}

export class FileEntryVM {
  @ApiProperty()
  fileName: string;

  @ApiProperty()
  filePath: string;

  @ApiProperty()
  fileMime: string;

  @ApiProperty()
  fileUrl: string;
}

export class FileListPaginationVM extends MBaseListResponse<FileVM[]> {}