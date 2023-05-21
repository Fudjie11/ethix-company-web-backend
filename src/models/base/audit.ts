import { ApiProperty } from "@nestjs/swagger";
// import { BaseAuditEntity } from "src/database/entity/base/audit";

export class MBaseAudit {
  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  deletedAt: Date;
}