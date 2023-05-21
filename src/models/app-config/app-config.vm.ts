import { ApiProperty } from '@nestjs/swagger';
import { MBaseListResponse } from '../base/base-list-response';

export class AppConfigVM {
  key: string;
  value: string;
}

export class AppConfigEntryVM {
  @ApiProperty()
  key: string;

  @ApiProperty()
  value: string;
}

export class AppConfigListPaginationVM extends MBaseListResponse<AppConfigVM[]> {}