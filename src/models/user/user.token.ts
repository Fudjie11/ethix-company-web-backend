import { ApiProperty } from '@nestjs/swagger';

export class UserTokenVm {
    @ApiProperty()
    accessToken: string;
}

