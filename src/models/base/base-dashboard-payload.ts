import { ApiProperty } from '@nestjs/swagger';

export class BaseDashboardPayload {
  @ApiProperty({ required: false })
  startDate?: Date;

  @ApiProperty({ required: false })
  endDate?: Date;
}