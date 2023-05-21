import { ApiProperty } from "@nestjs/swagger";

export class BaseBasicClass<T = any> {
  createdAt?: Date;
  updatedAt?: Date;

  constructor(data: Partial<T> = {}) {
    if (data) {
      Object.assign(this, data);
    }
  }
}
export class BaseBasicVmClass {
  @ApiProperty()
  createdAt?: Date;

  @ApiProperty()
  updatedAt?: Date;
}