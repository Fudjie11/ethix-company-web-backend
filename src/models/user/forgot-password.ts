import { ApiProperty } from '@nestjs/swagger';

export class ForgotPasswordPayload {
  @ApiProperty()
  email: string;
}

export class ForgotPasswordEmailPayload {
  @ApiProperty()
  password: string;
}