import { ApiProperty } from '@nestjs/swagger';
import { MBaseAudit } from './audit';

export class MUserAudit extends MBaseAudit {
  @ApiProperty()
  createdUserId: string;

  @ApiProperty()
  lastUpdatedUserId: string
}