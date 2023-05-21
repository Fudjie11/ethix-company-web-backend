import { ApiProperty } from '@nestjs/swagger';

export class MBaseListPayload {
  @ApiProperty({ required: false })
  skip?: number;

  @ApiProperty({ required: false })
  take?: number;

  @ApiProperty({ required: false })
  current?: number;

  @ApiProperty({ required: false})
  type?: string;

  @ApiProperty({ required: false })
  keyword?: string;

  @ApiProperty({ required: false })
  startDate?: Date;

  @ApiProperty({ required: false })
  endDate?: Date;
  
  @ApiProperty({ required: false })
  sort?: string;
}

export class MBaseReportPayload {
  @ApiProperty({ required: false })
  startDate?: Date;

  @ApiProperty({ required: false })
  endDate?: Date;

  @ApiProperty({ required: false })
  keyword?: string;
}
