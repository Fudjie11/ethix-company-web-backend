import { ApiProperty } from '@nestjs/swagger';

export class MBaseListResponse<T> {
  @ApiProperty()
  data: T;

  @ApiProperty()
  skip: number;

  @ApiProperty()
  take: number;

  @ApiProperty()
  total: number;
}
